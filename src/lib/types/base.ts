import { ErrorMessage } from './error';
export type InferType<T extends BaseSchema<any, ErrorMessage>> =
  T extends BaseSchema<infer U, ErrorMessage> ? U : never;
export type SchemaMap = Record<string, BaseSchema<any, ErrorMessage>>;
export type Validator<T> = (value: any) => T;
export type ParseInput = {
  data: any;
};

export type ParseReturnType<T> =
  | {
      value: T;
    }
  | {
      value: T;
      errors: ErrorMessage[];
    }
  | {
      errors: ErrorMessage[];
    };

export enum SchemaPrimitiveTypeKind {
  Number = 'number',
  Boolean = 'boolean'
}

export type SchemaPrimitiveType = number | boolean;

export abstract class BaseSchema<T, ErrorMessage> {
  constructor(private check: (value: unknown) => T) {}
  private validators: ((value: T) => void)[] = [];
  abstract errors: ErrorMessage[];
  // _parse(value: any): ParseReturnType<T>{}
  refine(validator: (value: T) => void): this {
    this.validators.push(validator);
    return this;
  }

  parse(data: unknown): any {
    const parsed = this.check(data);
    for (const validator of this.validators) {
      validator(parsed);
    }
    return parsed;
  }

  getError(): ErrorMessage {
    return this.errors[0];
  }
  hasError(): boolean {
    return this.errors.length > 0;
  }
}
