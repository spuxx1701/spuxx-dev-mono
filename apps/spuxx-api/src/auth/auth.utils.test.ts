import { removeProtocol } from './auth.utils';

describe('AuthUtils', () => {
  describe('removeProtocol', () => {
    it('should remove the protocol from a URL', () => {
      const urls = ['https://example.com', 'http://example.com', 'example.com'];
      const result = removeProtocol(urls);
      expect(result).toEqual(['example.com', 'example.com', 'example.com']);
    });
  });
});
