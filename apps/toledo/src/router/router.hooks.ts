import { SessionManager } from '@/services/session';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Redirects to a route if a condition is met.
 * @param check The check to perform.
 * @param target The route to redirect to.
 */
export const useConditionalRedirect = (check: () => boolean | Promise<boolean>, target: string) => {
  onBeforeMount(async () => {
    const { replace } = useRouter();
    const result = await check();
    if (result) {
      replace(target);
    }
  });
};

/**
 * Protects the route by redirecting to `/login` if the user is not authenticated.
 */
export const useProtection = () => {
  const { isNotAuthenticated } = SessionManager;
  useConditionalRedirect(isNotAuthenticated, '/login');
};
