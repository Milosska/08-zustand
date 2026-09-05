import css from './FormErrorMessage.module.css';

interface FormErrorMessageProps {
  error: string;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  return <span className={css.error}>{error} </span>;
};

export default FormErrorMessage;
