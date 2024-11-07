/**
 * Generates 4 random bytes and converts them to a 8-digit hexadecimal invite code.
 */
export function generateInviteCode() {
  const buffer = new Uint8Array(4);
  crypto.getRandomValues(buffer);
  const inviteCode = Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return inviteCode;
}
