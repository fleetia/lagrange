import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  Action,
  FormField,
  Heading,
  Rule,
  Select,
  Text,
  TextField,
  ThemeRoot,
} from '../index';

const meta = {
  title: 'Compositions/Quick Entry',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'FormField, Select, TextField, Action을 compact keyboard-first ledger form으로 조합한 reference composition입니다.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function formatWon(value: string): string {
  const amount = Number(value.replaceAll(',', ''));

  if (!Number.isFinite(amount)) {
    return value;
  }

  return new Intl.NumberFormat('ko-KR').format(amount);
}

function QuickEntryStory(): ReactElement {
  const [amount, setAmount] = useState('6500');
  const [category, setCategory] = useState('cafe');
  const [memo, setMemo] = useState('카페라떼');
  const [savedMessage, setSavedMessage] = useState('입력 대기');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSavedMessage(`${memo} · ₩ ${formatWon(amount)} 저장됨`);
  }

  return (
    <ThemeRoot className="lagrange-story lagrange-story--compact" data-testid="quick-entry-story">
      <header className="lagrange-story__header">
        <div>
          <p className="lagrange-story__kicker">Daily ledger · input specimen 03</p>
          <Heading level={1} variant="display">
            빠른 입력
          </Heading>
        </div>
        <Text variant="caption" tone="muted">
          Keyboard first · Enter to save
        </Text>
      </header>

      <Rule variant="structural" />

      <form
        aria-label="빠른 입력"
        className="lagrange-story__quick-entry"
        onSubmit={handleSubmit}
      >
        <FormField label="구분" marker="A1">
          <Select defaultValue="expense">
            <option value="expense">지출</option>
            <option value="income">수입</option>
            <option value="transfer">이체</option>
          </Select>
        </FormField>

        <FormField label="금액" marker="A2" required>
          <TextField
            inputMode="numeric"
            name="amount"
            onChange={(event) => setAmount(event.currentTarget.value)}
            value={amount}
          />
        </FormField>

        <FormField label="카테고리" marker="A3" required>
          <Select
            name="category"
            onChange={(event) => setCategory(event.currentTarget.value)}
            value={category}
          >
            <option value="cafe">식비 › 카페</option>
            <option value="meal">식비 › 외식</option>
            <option value="transport">교통비 › 대중교통</option>
          </Select>
        </FormField>

        <FormField label="결제수단" marker="A4">
          <Select defaultValue="hyundai">
            <option value="hyundai">현대카드</option>
            <option value="cash">현금</option>
            <option value="account">생활비 통장</option>
          </Select>
        </FormField>

        <FormField label="내용" marker="A5">
          <TextField
            name="memo"
            onChange={(event) => setMemo(event.currentTarget.value)}
            value={memo}
          />
        </FormField>

        <Action size="compact" type="submit">
          저장 ↵
        </Action>
      </form>

      <Rule variant="structural" />

      <Text
        as="p"
        aria-live="polite"
        data-testid="save-status"
        role="status"
        tone={savedMessage === '입력 대기' ? 'muted' : 'positive'}
        variant="caption"
      >
        {savedMessage}
      </Text>

      <section className="lagrange-story__section" aria-labelledby="state-heading">
        <div className="lagrange-story__section-heading">
          <Heading id="state-heading" level={2} variant="subsection">
            Field states
          </Heading>
          <span className="lagrange-story__index">S1—S3</span>
        </div>
        <div className="lagrange-story__state-grid">
          <div className="lagrange-story__state-example">
            <FormField description="기본 입력 상태" label="내용" marker="S1">
              <TextField defaultValue="카페라떼" />
            </FormField>
          </div>
          <div className="lagrange-story__state-example">
            <FormField description="Geometry remains unchanged" label="내용" marker="S2">
              <TextField autoFocus defaultValue="카페라떼" />
            </FormField>
          </div>
          <div className="lagrange-story__state-example">
            <FormField error="카테고리를 선택하세요" label="카테고리" marker="S3">
              <Select defaultValue="">
                <option disabled value="">
                  선택하세요
                </option>
                <option value="cafe">식비 › 카페</option>
              </Select>
            </FormField>
          </div>
        </div>
      </section>
    </ThemeRoot>
  );
}

export const HouseholdExpense: Story = {
  render: QuickEntryStory,
  play: async ({ canvas, userEvent }): Promise<void> => {
    const form = within(canvas.getByRole('form', { name: '빠른 입력' }));
    const amountField = form.getByRole('textbox', { name: '금액' });
    const categoryField = form.getByRole('combobox', { name: '카테고리' });
    const memoField = form.getByRole('textbox', { name: '내용' });

    await userEvent.clear(amountField);
    await userEvent.type(amountField, '12500');
    await userEvent.selectOptions(categoryField, 'transport');
    await userEvent.clear(memoField);
    await userEvent.type(memoField, '버스 정기권');
    await userEvent.tab();

    const saveAction = form.getByRole('button', { name: '저장 ↵' });
    await expect(saveAction).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '버스 정기권 · ₩ 12,500 저장됨',
    );
  },
};
