'use client';
import ErrorMessage from '@/components/ErrorMessage';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorMessage error={error.message} isResetBtn reset={reset} />;
}
