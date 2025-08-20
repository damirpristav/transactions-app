import axios from 'axios';
import type { PaginatedData } from 'types';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
});

export const fetcherPaginated = <T>(url: string): Promise<PaginatedData<T>> => api.get(url).then((res) => res.data);
export const fetcher = <T>(url: string): Promise<T> => api.get(url).then((res) => res.data);
