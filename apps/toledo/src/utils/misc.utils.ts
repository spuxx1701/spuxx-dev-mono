/**
 * Returns true if the given array is null, undefined or empty.
 * @param array The array to check.
 * @returns Whether the given array is null, undefined or empty.
 */
export function isEmptyArray(array: Array<unknown> | undefined | null) {
  return !array || array.length <= 0;
}
