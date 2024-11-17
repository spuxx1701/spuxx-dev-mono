import { Validator } from '@/services/validator/validator.service';

export const listValidationRules = {
  settings: {
    name: [
      (v: string) => Validator.required(v),
      (v: string) => Validator.minLength(v, 3),
      (v: string) => Validator.maxLength(v, 30),
    ],
    icon: [
      (v: string) => Validator.required(v),
      (v: string) => Validator.minLength(v, 3),
      (v: string) => Validator.maxLength(v, 30),
    ],
  },
  item: {
    text: [(v: string) => Validator.maxLength(v, 255)],
    quantity: [(v: string) => Validator.min(v, 1), (v: string) => Validator.max(v, 99)],
  },
};
