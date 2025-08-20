import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { useField } from 'formik';

export const NumberInput = ({ label, name, ...props }: Props) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <NumericFormat
        id={name}
        name={name}
        value={field.value}
        onValueChange={(values) => helpers.setValue(values.value)}
        className={meta.error && meta.touched ? 'input-error' : ''}
        {...props}
      />
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

interface Props extends NumericFormatProps {
  label: string;
  name: string;
}
