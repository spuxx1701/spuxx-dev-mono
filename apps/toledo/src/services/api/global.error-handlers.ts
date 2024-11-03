import router from '@/router';
import type { ErrorHandler } from '@spuxx/js-utils';

export const globalErrorHandlers: ErrorHandler[] = [
  {
    statusFilter: (status) => status === 401,
    function: () => {
      router.replace('/login');
    },
  },
];
