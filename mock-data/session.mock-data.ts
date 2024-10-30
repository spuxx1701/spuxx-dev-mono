import { AuthRole } from '@spuxx-api/src/auth/auth.config';
import { SessionResource } from '@spuxx-api/tests/auth/session-resource';

export const sessionMockData = {
  privileged: {
    sub: '2f09d473-5732-45d7-b397-1941740c2efc',
    sid: 'e517a1d4-b7e7-4b6e-af94-8e5d0505fdce',
    name: 'John Shepard',
    given_name: 'John',
    family_name: 'Shepard',
    email: 'john.shepard@spectres.gov',
    preferred_username: 'Commander Shepard',
    email_verified: true,
    groups: [AuthRole.toledoUser, AuthRole.toledoParent],
    locale: 'en',
  } as SessionResource,
  unprivileged: {
    sub: '2ccc1832-c988-4df9-b464-9c02705feaf8',
    sid: 'd8b901cb-6199-450f-ad85-1cba837870a5',
    name: 'Larry Laffer',
    given_name: 'Larry',
    family_name: 'Laffer',
    email: 'larry.laffer@xxx.com',
    preferred_username: 'Leisure Suit Larry',
    email_verified: true,
    groups: [],
    locale: 'de',
  } as SessionResource,
};
