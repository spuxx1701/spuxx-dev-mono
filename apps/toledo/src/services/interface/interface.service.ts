import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ref, type Ref } from 'vue';

export class Interface extends ServiceMixin<Interface>() {
  private _sidebarExpanded = ref(false);

  static toggleSidebar() {
    const newValue = !Interface.instance._sidebarExpanded.value;
    Interface.instance._sidebarExpanded.value = newValue;
    Logger.debug(`Sidebar has been ${newValue ? 'expanded' : 'collapsed'}.`, Interface.name);
  }

  static get sidebarExpanded(): Ref<boolean> {
    return this.instance._sidebarExpanded;
  }

  static setSidebarExpanded(open: boolean) {
    Interface.instance._sidebarExpanded.value = open;
    Logger.debug(`Sidebar has been ${open ? 'expanded' : 'collapsed'}.`, Interface.name);
  }
}
