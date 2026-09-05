import { useState } from 'react';
import type { ReactElement } from 'react';
import { FormField } from '../FormField';
import { NumberField } from '../NumberField';

type ChannelInputProps = {
  label: string;
  value: number;
  max: number;
  onCommit: (value: number) => void;
};

export function ChannelInput({
  label,
  value,
  max,
  onCommit,
}: ChannelInputProps): ReactElement {
  const displayValue = String(Math.round(value * 100) / 100);
  const [previousValue, setPreviousValue] = useState(displayValue);
  const [draft, setDraft] = useState(displayValue);
  if (previousValue !== displayValue) {
    setPreviousValue(displayValue);
    setDraft(displayValue);
  }
  function commit(): void {
    if (draft === displayValue) {
      return;
    }
    const parsed = Number(draft);
    if (draft.trim() && Number.isFinite(parsed))
      onCommit(Math.min(max, Math.max(0, parsed)));
    setDraft(displayValue);
  }
  return (
    <FormField label={label}>
      <NumberField
        allowNegative={false}
        formatOnBlur={false}
        value={draft}
        onRawValueChange={setDraft}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
          }
          if (event.key === 'Escape' && draft !== displayValue) {
            event.preventDefault();
            setDraft(displayValue);
          }
        }}
      />
    </FormField>
  );
}
