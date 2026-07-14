import type { ComboboxOption } from './types';

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function getOptionByValue(
  options: readonly ComboboxOption[],
  value: string,
): ComboboxOption | undefined {
  return options.find((option) => option.value === value);
}

export function getFilteredOptions(
  options: readonly ComboboxOption[],
  inputValue: string,
  selectedLabel?: string,
): readonly ComboboxOption[] {
  const query = normalizeSearchValue(inputValue);

  if (!query || query === normalizeSearchValue(selectedLabel ?? '')) {
    return options;
  }

  return options.filter((option) => {
    const searchableText = normalizeSearchValue(
      `${option.label} ${option.description ?? ''}`,
    );

    return searchableText.includes(query);
  });
}

export function getEnabledOptionIndex(
  options: readonly ComboboxOption[],
  currentIndex: number,
  direction: 1 | -1,
): number {
  if (options.length === 0) {
    return -1;
  }

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index =
      (currentIndex + direction * offset + options.length) % options.length;

    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}
