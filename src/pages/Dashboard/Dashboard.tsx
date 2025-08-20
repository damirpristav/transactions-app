import { Loader, TransactionRow } from 'components';
import { useSummary } from 'hooks/useSummary';
import { useTransactions } from 'hooks/useTransactions';

export const Dashboard = () => {
  const { data, isLoading } = useTransactions(true);
  const { data: summary, isLoading: isSummaryLoading } = useSummary({ latest: true });

  return (
    <>
      <section className="section-title mb-1">
        <h2>Latest Transactions</h2>
      </section>

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
              </div>
            </div>
            {data && data.data.length > 0 ? (
              <div className="table-body">
                {data.data.map((transaction) => (
                  <TransactionRow transaction={transaction} key={transaction.id} />
                ))}
              </div>
            ) : (
              <div className="no-data">
                <p>No transactions found</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
