import router from '@/router';
import type { ErrorHandler } from '@spuxx/js-utils';

export const globalErrorHandlers: ErrorHandler[] = [
  {
    statusFilter: (status) => status === 401,
    function: () => {
      if (router.currentRoute.value.name !== 'login') router.replace('/login');
    },
  },
  {
    statusFilter: (status) => status === 403,
    function: () => {
      router.replace('/forbidden');
    },
  },
];
