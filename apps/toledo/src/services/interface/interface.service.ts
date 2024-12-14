import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ref, type Ref } from 'vue';

export class Interface extends ServiceMixin<Interface>() {
  private _documentStyle = document.documentElement.style;

  private _sidebarExpanded = ref(false);
  private _touchGestureInProgress = ref(false);
  private _touchGestureTimer: number | null = null;
  private static _touchGestureTimeout = 500;

  static get documentStyle() {
    return this.instance._documentStyle;
  }

  static get sidebarExpanded(): Ref<boolean> {
    return this.instance._sidebarExpanded;
  }

  static get touchGestureInProgress(): Ref<boolean> {
    return this.instance._touchGestureInProgress;
  }

  static toggleSidebar() {
    const newValue = !Interface.instance._sidebarExpanded.value;
    Interface.instance._sidebarExpanded.value = newValue;
    Logger.debug(`Sidebar has been ${newValue ? 'expanded' : 'collapsed'}.`, Interface.name);
  }

  static setSidebarExpanded(open: boolean) {
    Interface.instance._sidebarExpanded.value = open;
    Logger.debug(`Sidebar has been ${open ? 'expanded' : 'collapsed'}.`, Interface.name);
  }

  static unfocusActiveElement() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }

  /**
   * Register a touch gesture. Will set `Interface.touchGestureInProgress` to true
   * and disable native scrolling. The gesture will automatically deregister after
   * a timeout, resetting the state and re-enabling scrolling.
   */
  static registerTouchGesture() {
    if (this.touchGestureInProgress.value) {
      // Reset the timer if it's already running
      if (this.instance._touchGestureTimer !== null) {
        clearTimeout(this.instance._touchGestureTimer);
      }
    } else {
      // Set the value to true if it wasn't already
      this.touchGestureInProgress.value = true;
      this.toggleDocumentScrolling(false);
      Logger.debug('Touch gesture registered.', Interface.name);
    }

    // Set (or reset) the timer
    this.instance._touchGestureTimer = setTimeout(() => {
      this.touchGestureInProgress.value = false;
      this.instance._touchGestureTimer = null;
      this.toggleDocumentScrolling(true);
      Logger.debug('Touch gesture deregistered.', Interface.name);
    }, this._touchGestureTimeout);
  }

  private static toggleDocumentScrolling(enable: boolean) {
    this.documentStyle.setProperty('--document-overflow-y', enable ? 'auto' : 'hidden');
  }
}
