import type { ExtractPublicPropTypes } from 'vue';

export {};

declare global {
  /**
   * Unwraps the type of the properties of a Vuetify component.
   */
  export type VProps<TComponent, Except extends keyof TComponent = never> = Omit<
    ExtractPublicPropTypes<TComponent>,
    Except
  >;
  /**
   * Unwraps the type of a specific property of a Vuetify component.
   */
  export type VProp<
    TComponent,
    TKey extends keyof InstanceType<TComponent>['$props'],
  > = InstanceType<TComponent>['$props'][TKey];
  /**
   * A color is a string that represents a color in the Vuetify theme.
   */
  export type Color = 'primary' | 'primary-darken-1' | 'secondary' | 'surface';
  /**
   * A set of options to provide when fetching data through a store.
   */
  export interface StoreFetchOptions {
    /**
     * When enabled, will force a reload and overwrite any cached data.
     */
    reload?: boolean;
  }
}
