import type { Ref } from 'vue';

/**
 * Resource class to handle async data loading.
 */
export class Resource<T = unknown> {
  state: 'pending' | 'failed' | 'success' = 'pending';
  data: T | null = null;
}

/**
 * A generic function that loads a resource asynchronously.
 * @param resourceRef The `ref` that will hold the resource.
 * @param resourcePromise The promise that resolves to the resource.
 */
export async function loadResource(resourceRef: Ref<Resource>, loader: () => Promise<unknown>) {
  resourceRef.value.state = 'pending';
  try {
    resourceRef.value.data = await loader();
    resourceRef.value.state = 'success';
  } catch (error) {
    resourceRef.value.state = 'failed';
    throw error;
  }
}
