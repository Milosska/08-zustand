'use client';
import Link from 'next/link';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  error: string;
  isResetBtn?: boolean;
  reset?: () => void;
  isNavigationLink?: boolean;
  navigationRef?: string;
  navigationText?: string;
}

const ErrorMessage = ({
  error,
  isResetBtn = false,
  reset,
  isNavigationLink = false,
  navigationRef,
  navigationText,
}: ErrorMessageProps) => {
  return (
    <div className={css.container}>
      <p className={css.error}>{error}</p>
      {isResetBtn && (
        <button className={css.button} onClick={reset}>
          Try Again
        </button>
      )}
      {isNavigationLink && (
        <Link href={navigationRef ?? '/'} className={css.button}>
          {navigationText}
        </Link>
      )}
    </div>
  );
};

export default ErrorMessage;
