/**
 * Takes an array of URLs and removes the protocol (http:// or https://) from each URL.
 * @param {string[]} urls - An array of URLs.
 * @returns {string[]} - An array of URLs with the protocol removed.
 */
export function removeProtocol(urls: string[]): string[] {
  return urls.map((url) => url.replace(/^https?:\/\//, ''));
}
