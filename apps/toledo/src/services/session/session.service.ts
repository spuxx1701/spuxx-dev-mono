import { Logger, ServiceMixin } from '@spuxx/js-utils';
import { ref } from 'vue';
import { Api } from '../api';
import type { Session } from '../api/auth/session.types';
export class SessionManager extends ServiceMixin<SessionManager>() {
  private _session = ref<Session | undefined>(undefined);

  static get session() {
    return this.instance._session;
  }

  static isAuthenticated() {
    return !!SessionManager.getSession();
  }

  static isNotAuthenticated() {
    return !SessionManager.getSession();
  }

  static async getSession() {
    if (!this.session.value) {
      const session: Session | undefined = await Api.getSession();
      if (!session) return;
      Logger.debug(`Logged in as ${session.preferred_username}.`, SessionManager.name);
      SessionManager.session.value = session;
    }
    return SessionManager.instance._session;
  }
}
