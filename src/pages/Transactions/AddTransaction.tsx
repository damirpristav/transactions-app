import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router';

import { DatePicker, NumberInput, Select, TextArea, type SelectOption } from 'components';
import { useCategories } from 'hooks/useCategories';
import { useCreateTransactionMutation } from 'hooks/useTransactionMutation';
import type { AddTransactionData } from 'types';
import { PATHS } from 'router/types';
import { initialValues, validationSchema } from './formHelpers';

export const AddTransaction = () => {
  const { data: categories } = useCategories();
  const { trigger } = useCreateTransactionMutation();
  const navigate = useNavigate();

  const categoriesOptions = useMemo<SelectOption[]>(() => {
    if (!categories) return [];
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const onSubmit = async (values: AddTransactionData) => {
    try {
      const date = values.date || new Date();
      await trigger({
        ...values,
        date: date.toISOString(),
      });
      navigate(PATHS.Transactions);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-title mb-1">
        <h2>Add new transaction</h2>
      </section>

      <Formik<AddTransactionData> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="form">
            <Select name="category_id" label="Category" options={categoriesOptions} />
            <Select
              name="type"
              label="Type"
              options={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
              ]}
            />
            <NumberInput name="amount" label="Amount" decimalScale={2} allowNegative={false} prefix="€" />
            <DatePicker name="date" label="Date" />
            <TextArea name="description" label="Description" />
            <div>
              <button type="submit" className="button" disabled={isSubmitting}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
