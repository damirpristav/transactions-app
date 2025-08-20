import { useField } from 'formik';
import clsx from 'clsx';

export const TextArea = ({ label, name, wrapperClassName, ...props }: Props) => {
  const [field, meta] = useField(name);

  return (
    <div className={clsx('form-input', wrapperClassName)}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={field.value}
        onChange={field.onChange}
        className={meta.error && meta.touched ? 'input-error' : ''}
        {...props}
      />
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

interface Props {
  label: string;
  name: string;
  wrapperClassName?: string;
}
