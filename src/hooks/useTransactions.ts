import { useState } from 'react';
import useSWR from 'swr';

import { fetcherPaginated } from 'config';
import type { Transaction, TransactionsRequestParams } from 'types';

export const useTransactionsSwr = ({ page, latest, fromDate, toDate }: TransactionsRequestParams) => {
  let url = `/transactions?page=${page}`;
  if (latest) {
    url += '&latest=true';
  }
  if (fromDate) {
    url += `&dateFrom=${fromDate.toISOString()}`;
  }
  if (toDate) {
    url += `&dateTo=${toDate.toISOString()}`;
  }
  return useSWR(url, fetcherPaginated<Transaction>, { revalidateOnFocus: false });
};

export const useTransactions = (latest?: boolean) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const { data, isLoading, mutate } = useTransactionsSwr({
    page: currentPage,
    latest,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const onPageReset = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return {
    data,
    isLoading,
    currentPage,
    fromDate,
    toDate,
    mutate,
    onPageReset,
    goToNextPage,
    goToPrevPage,
    setFromDate,
    setToDate,
  };
};
