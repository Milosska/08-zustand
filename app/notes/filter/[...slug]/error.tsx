'use client';
import ErrorMessage from '@/components/ErrorMessage';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorMessage
      error={error.message}
      isNavigationLink
      navigationRef={'/notes/filter/all'}
      navigationText={'Show all notes'}
      reset={reset}
    />
  );
}
