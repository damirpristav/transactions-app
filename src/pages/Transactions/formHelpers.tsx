import * as yup from 'yup';

import type { AddTransactionData } from 'types';

export const initialValues: AddTransactionData = {
  amount: '',
  category_id: null,
  date: null,
  description: '',
  type: '',
};

export const validationSchema = yup.object().shape<{ [key in keyof AddTransactionData]: yup.Schema<any> }>({
  amount: yup
    .string()
    .trim()
    .required('Amount is required')
    .test('invalid-amount', 'Amount is required', (value) => {
      return !(value && value === '0');
    }),
  description: yup.string().trim(),
  type: yup.string().trim().required('Type is required'),
  date: yup.string().nullable(),
  category_id: yup.number().required('Category is required'),
});
