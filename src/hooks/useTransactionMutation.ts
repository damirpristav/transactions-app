import useSWRMutation from 'swr/mutation';

import { api } from 'config';
import type { AddTransactionMutationData } from 'types';

const ROUTE = '/transactions';

async function createTransaction(url: string, { arg }: { arg: AddTransactionMutationData }) {
  return await api.post(url, arg);
}

async function deleteTransaction(url: string) {
  return await api.delete(url);
}

export const useCreateTransactionMutation = () => {
  return useSWRMutation(ROUTE, createTransaction);
};

export const useDeleteTransactionMutation = (id: string) => {
  return useSWRMutation(`${ROUTE}/${id}`, deleteTransaction);
};
