import { intl, isEmptyOrWhitespace, ServiceMixin } from '@spuxx/js-utils';

export class Validator extends ServiceMixin<Validator>() {
  static required: (v: string) => boolean | string = (v) =>
    !isEmptyOrWhitespace(v) || intl('validation.required');
  static minLength: (v: string, min: number) => boolean | string = (v, min) =>
    v.length >= min || intl('validation.min-length', { min: min.toString() });
  static maxLength: (v: string, max: number) => boolean | string = (v, max) =>
    v.length <= max || intl('validation.max-length', { max: max.toString() });
}
