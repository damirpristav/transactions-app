import useSWR from 'swr';

import { fetcher } from 'config';
import type { Category } from 'types';

export const useCategories = () => {
  return useSWR('/categories', fetcher<Category[]>, { revalidateOnFocus: false });
};
