import clsx from 'clsx';

import type { TransactionType } from "types";

export const Status = ({ variant, label }: Props) => {
  return (
    <div className={clsx('status', { 'status-success': variant === 'income', 'status-info': variant === 'expense' })}>
      {label}
    </div>
  );
};

type Props = {
  variant: TransactionType;
  label: string;
};
