import { generateInviteCode } from './invite-links.utils';

describe('utils/invite-links', () => {
  describe('generateInviteCode', () => {
    it('should generate valid invite codes', () => {
      expect(generateInviteCode()).toMatch(/^[a-f0-9]{8}$/);
      expect(generateInviteCode()).toMatch(/^[a-f0-9]{8}$/);
      expect(generateInviteCode()).toMatch(/^[a-f0-9]{8}$/);
      expect(generateInviteCode()).toMatch(/^[a-f0-9]{8}$/);
      expect(generateInviteCode()).toMatch(/^[a-f0-9]{8}$/);
    });
  });
});
