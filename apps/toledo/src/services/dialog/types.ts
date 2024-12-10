export const DialogSize = {
  small: '400px',
  medium: '600px',
  large: '1000px',
  full: '100%',
} as const;
export type DialogSize = keyof typeof DialogSize;

export interface DialogOptions {
  /**
   * The title of the dialog.
   */
  title: string;
  /**
   * The icon of the dialog.
   */
  icon?: string;
  /**
   * The icon of the dialog. If none is provided, no icon will be visible.
   */
  size?: DialogSize;
  /**
   * When enabled, the dialog cannot be closed by clicking outside of it or pressing
   * the escape key.
   */
  persistent?: boolean;
  /**
   * The label of the cancel button. Defaults to 'Cancel'.
   */
  cancelLabel?: string;
  /**
   * The function to be called when the dialog is cancelled or closed.
   */
  onCancel?: () => void;
}
