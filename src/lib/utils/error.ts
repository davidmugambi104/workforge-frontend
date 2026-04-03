import axios from 'axios';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const flattenDetails = (details: unknown): string[] => {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details.flatMap(flattenDetails);
  }

  if (isNonEmptyString(details)) {
    return [details.trim()];
  }

  if (typeof details === 'object') {
    return Object.values(details as Record<string, unknown>).flatMap(flattenDetails);
  }

  return [];
};

export const extractApiErrorMessage = (
  error: unknown,
  fallback = 'An unexpected error occurred'
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    const detailMessages = flattenDetails(data?.details ?? data?.errors ?? data?.detail);

    const directMessage =
      (isNonEmptyString(data?.error) && data.error.trim()) ||
      (isNonEmptyString(data?.message) && data.message.trim()) ||
      (isNonEmptyString(data?.detail) && data.detail.trim()) ||
      '';

    // Improve generic backend validation labels with concrete field messages.
    if (directMessage.toLowerCase() === 'validation error' && detailMessages.length > 0) {
      return detailMessages.join(', ');
    }

    if (directMessage) {
      return directMessage;
    }

    if (detailMessages.length > 0) {
      return detailMessages.join(', ');
    }

    if (error.code === 'ERR_NETWORK') {
      return 'Unable to reach the server. Check your internet connection and try again.';
    }

    if (isNonEmptyString(error.message)) {
      return error.message;
    }
  }

  if (error instanceof Error && isNonEmptyString(error.message)) {
    return error.message;
  }

  return fallback;
};

export const normalizeAxiosErrorPayload = (error: unknown): void => {
  if (!axios.isAxiosError(error)) {
    return;
  }

  const message = extractApiErrorMessage(error);

  if (!error.response) {
    return;
  }

  if (!error.response.data || typeof error.response.data !== 'object') {
    error.response.data = { error: message };
    return;
  }

  const payload = error.response.data as Record<string, unknown>;
  if (!isNonEmptyString(payload.error)) {
    payload.error = message;
  }
  if (!isNonEmptyString(payload.message)) {
    payload.message = message;
  }
};
