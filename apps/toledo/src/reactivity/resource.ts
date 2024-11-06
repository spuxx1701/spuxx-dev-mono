import { Logger } from '@spuxx/js-utils';
import { ref, type Ref } from 'vue';

export const ResourceState = {
  initial: 'initial',
  pending: 'pending',
  failed: 'failed',
  success: 'success',
} as const;
export type ResourceState = (typeof ResourceState)[keyof typeof ResourceState];

/**
 * A resource is an object that represents an async data loading process.
 */
export class Resource<T, Args extends unknown[] = []> {
  private _name: string;
  private _data = ref<T | null>(null);
  private _state = ref<ResourceState>(ResourceState.initial);
  private _loader: (...args: Args) => Promise<T>;

  /**
   * @param loader The function that loads the resource.
   */
  constructor(loader: (...args: Args) => Promise<T>, name: string = 'unknown') {
    this._loader = loader;
    this._name = name;
  }

  /**
   * Loads the resource.
   */
  async load(...args: Args): Promise<this> {
    this.state.value = ResourceState.pending;
    try {
      this._data.value = await this._loader(...args);
      this.state.value = ResourceState.success;
      Logger.debug(`Resource '${this._name}' loaded successfully.`, this.constructor.name);
      return this;
    } catch (error) {
      this.state.value = ResourceState.failed;
      throw error;
    }
  }

  /**
   * The data of the resource.
   */
  get data() {
    return this._data as Ref<T | null>;
  }

  /**
   * The state of the resource.
   */
  get state() {
    return this._state;
  }
}
