import type { Dispatch, SetStateAction } from 'react';

import type { Transaction } from 'types';
import { useDeleteTransactionMutation } from 'hooks/useTransactionMutation';
import { Status } from 'components/ui';

export const TransactionRow = ({ transaction, isDeleting, onDeleteCallback, setIsDeleting }: Props) => {
  const { id, type, amount, category, description, date } = transaction;
  const { trigger, isMutating } = useDeleteTransactionMutation(id);

  const onDelete = async () => {
    try {
      setIsDeleting?.(true);
      await trigger();
      onDeleteCallback?.();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsDeleting?.(false);
    }
  };

  return (
    <div className="table-row">
      <div className="table-cell" data-label="Amount:">
        €{amount}
      </div>
      <div className="table-cell" data-label="Type:">
        <Status variant={type} label={type} />
      </div>
      <div className="table-cell" data-label="Category:">
        <div className="category" style={{ backgroundColor: category.color }}>
          {category.name}
        </div>
      </div>
      <div className="table-cell" data-label="Description:">
        {description}
      </div>
      <div className="table-cell" data-label="Date:">
        {date ? new Date(date).toDateString() : ''}
      </div>
      {onDeleteCallback && (
        <div className="table-cell table-cell-actions">
          <button
            type="button"
            className="button button--small button--danger"
            onClick={onDelete}
            disabled={isMutating || isDeleting}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

type Props = {
  transaction: Transaction;
} & (
  | {
      isDeleting?: never;
      onDeleteCallback?: never;
      setIsDeleting?: never;
    }
  | {
      isDeleting: boolean;
      onDeleteCallback: () => void;
      setIsDeleting: Dispatch<SetStateAction<boolean>>;
    }
);
