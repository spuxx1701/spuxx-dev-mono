import { ServiceMixin } from '@spuxx/js-utils';
import { ref, shallowRef } from 'vue';
import type { DialogOptions } from './types';
// import { DialogRegistry, type DialogKey } from './dialog.registry';

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
  // static open<K extends DialogKey>(key: DialogKey, options: DialogRegistry[K]['options']) {
  //   const dialogInfo = DialogRegistry[key];
  //   const component = dialogInfo.component;
  //   const defaultOptions = dialogInfo.options;
  // }
  static open<TOptions extends DialogOptions>(component: any, options: TOptions) {
    console.log(component.__name); // Prints: ConfirmDialog
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
