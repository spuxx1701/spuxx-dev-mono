export {};

declare global {
  /**
   * Unwraps the type of the properties of a Vuetify component.
   */
  export type VProps<TComponent> = InstanceType<TComponent>['$props'];
  /**
   * A color is a string that represents a color in the Vuetify theme.
   */
  export type Color = 'accent' | 'primary' | 'secondary' | 'surface';
}
