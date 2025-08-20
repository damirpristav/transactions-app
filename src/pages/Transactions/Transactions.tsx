import { useState } from 'react';
import { NavLink } from 'react-router';
import ReactDatePicker from 'react-datepicker';

import { Loader, TransactionRow } from 'components';
import { useSummary } from 'hooks/useSummary';
import { useTransactions } from 'hooks/useTransactions';
import { addOneDayToDate, subtractOneDayFromDate } from 'helpers';

export const Transactions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    data,
    isLoading,
    fromDate,
    toDate,
    currentPage,
    setFromDate,
    setToDate,
    goToNextPage,
    goToPrevPage,
    onPageReset,
    mutate: mutateTransactions,
  } = useTransactions();
  const {
    data: summary,
    isLoading: isSummaryLoading,
    mutate: mutateSummary,
  } = useSummary({
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const onDeleteCallback = () => {
    if (data && data.last_page === currentPage && data.data.length === 1 && currentPage > 1) {
      goToPrevPage();
    } else {
      mutateTransactions();
    }
    mutateSummary();
  };

  return (
    <>
      <div className="page-top-bar mb-1">
        <NavLink to="new" className="button">
          Add transaction
        </NavLink>
        <div className="page-top-bar-right">
          <ReactDatePicker
            selected={fromDate}
            maxDate={toDate ? subtractOneDayFromDate(toDate) : undefined}
            onChange={(date) => {
              setFromDate(date);
              onPageReset();
            }}
            dateFormat="dd/MM/YYYY"
            className="date-input"
            isClearable
            placeholderText="From date"
            onKeyDown={(e) => e.preventDefault()}
            popperPlacement="bottom-end"
          />
          <ReactDatePicker
            selected={toDate}
            minDate={fromDate ? addOneDayToDate(fromDate) : undefined}
            onChange={(date) => {
              setToDate(date);
              onPageReset();
            }}
            dateFormat="dd/MM/YYYY"
            className="date-input"
            isClearable
            placeholderText="To date"
            onKeyDown={(e) => e.preventDefault()}
            popperPlacement="bottom-end"
          />
        </div>
      </div>

      {(isLoading || isSummaryLoading) && <Loader />}

      {!isLoading && !isSummaryLoading && (
        <>
          <div className="boxes">
            <div className="box">
              <p>Income</p>
              <p className="box-value">€{summary?.total_income ?? 0}</p>
            </div>
            <div className="box">
              <p>Expense</p>
              <p className="box-value">€{summary?.total_expense ?? 0}</p>
            </div>
          </div>

          <div className="table my-1">
            <div className="table-head">
              <div className="table-row">
                <div className="table-cell">Type</div>
                <div className="table-cell">Amount</div>
                <div className="table-cell">Category</div>
                <div className="table-cell">Description</div>
                <div className="table-cell">Date</div>
                <div className="table-cell table-cell-actions">&nbsp;</div>
              </div>
            </div>
            {data && data.data.length > 0 ? (
              <div className="table-body">
                {data.data.map((transaction) => (
                  <TransactionRow
                    transaction={transaction}
                    key={transaction.id}
                    onDeleteCallback={onDeleteCallback}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                  />
                ))}
              </div>
            ) : (
              <div className="no-data">
                <p>No transactions found</p>
              </div>
            )}
          </div>
          {data && data.last_page > 1 && (
            <div className="pagination">
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="button button--small"
              >
                prev
              </button>
              <button
                type="button"
                onClick={goToNextPage}
                disabled={data.last_page === currentPage}
                className="button button--small"
              >
                next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
