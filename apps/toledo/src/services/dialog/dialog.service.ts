import { ServiceMixin } from '@spuxx/js-utils';
import { ref, shallowRef } from 'vue';
import type { DialogOptions } from './types';
export class Dialog extends ServiceMixin<Dialog>() {
  private static _activeDialogComponent = shallowRef<HTMLDialogElement | null>(null);
  private static _activeDialogOptions = ref<DialogOptions | null>(null);

  static get activeDialogComponent() {
    return this._activeDialogComponent.value;
  }

  static get activeDialogOptions() {
    return this._activeDialogOptions.value;
  }

  /**
   * Opens a given dialog.
   * @param key The key of the dialog to open.
   * @param options The dialog options.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static open<TOptions extends DialogOptions>(component: any, options: TOptions) {
    this._activeDialogComponent.value = component;
    this._activeDialogOptions.value = options;
  }

  /**
   * Closes the active dialog.
   */
  static close() {
    this._activeDialogComponent.value = null;
    this._activeDialogOptions.value = null;
  }
}
