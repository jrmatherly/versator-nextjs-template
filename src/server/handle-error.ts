import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { toast } from 'sonner';
import * as z from 'zod';
import { authLogger } from '~/server/logger';

import { unknownError } from '~/server/constants';

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return err.errors[0]?.message ?? unknownError;
  }
  
  if (typeof window !== 'undefined' && isClerkAPIResponseError(err)) {
    // Check for client-side environment before using `isClerkAPIResponseError`
    return err.errors[0]?.longMessage ?? unknownError;
  }
  
  if (err instanceof Error) {
    return err.message;
  }
  
  return unknownError;
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  authLogger.error('Error occurred', errorMessage);

  return toast.error(errorMessage);
}
