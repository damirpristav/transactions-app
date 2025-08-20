import useSWR from 'swr';

import { fetcher } from 'config';
import type { Summary, SummaryRequestParams } from 'types';

export const useSummary = ({ latest, fromDate, toDate }: SummaryRequestParams) => {
  const baseUrl = '/summary';
  let filters = '';
  if (latest) {
    filters = '?latest=true';
  }
  if (fromDate) {
    filters += `${filters ? '&' : '?'}dateFrom=${fromDate.toISOString()}`;
  }
  if (toDate) {
    filters += `${filters ? '&' : '?'}dateTo=${toDate.toISOString()}`;
  }
  const url = `${baseUrl}${filters}`;
  return useSWR(url, fetcher<Summary>, { revalidateOnFocus: false });
};
