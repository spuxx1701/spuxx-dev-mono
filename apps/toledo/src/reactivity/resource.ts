import { Logger } from '@spuxx/js-utils';
import { reactive, ref, type UnwrapNestedRefs } from 'vue';

export const ResourceState = {
  initial: 'initial',
  pending: 'pending',
  failed: 'failed',
  success: 'success',
} as const;
export type ResourceState = (typeof ResourceState)[keyof typeof ResourceState];

export type ResourceLoader<T> = () => Promise<T>;

/**
 * A resource is an object that represents an async data loading process.
 */
export class Resource<T extends object> {
  private _name: string;
  private _data: UnwrapNestedRefs<T> | null;
  private _state = ref<ResourceState>(ResourceState.initial);
  private _loader: ResourceLoader<T>;

  /**
   * @param loader The function that loads the resource.
   */
  constructor(loader: ResourceLoader<T>, name?: string) {
    this._loader = loader;
    this._data = null;
    this._name = name ?? 'unknown';
  }

  /**
   * Loads the resource.
   */
  load() {
    this.state.value = ResourceState.pending;
    this._loader()
      .then((data) => {
        this._data = reactive(data);
        // this._data.value = data as UnwrapRef<T>;
        this.state.value = ResourceState.success;
        Logger.debug(`Resource '${this._name}' loaded successfully.`, this.constructor.name);
      })
      .catch((error) => {
        this.state.value = ResourceState.failed;
        throw error;
      });
  }

  /**
   * The data of the resource.
   */
  get data() {
    return this._data;
  }

  /**
   * The state of the resource.
   */
  get state() {
    return this._state;
  }
}
