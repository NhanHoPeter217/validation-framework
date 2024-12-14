import { Error, Message } from '../errors/ValidationError';
import { InternalTest, Test } from '../others/createValidation';
export type RawShape = Record<string, any>;

// export type FieldsErrors<T> = {
//   [K in keyof T]?: T[K] extends RawShape ? FieldsErrors<T[K]> : ValidationError[];
// };
export type TypeOf<T extends Schema<any>> = T['_output'];
export type { TypeOf as infer };

export interface SchemaSpec {
  nullable: boolean;
  optional: boolean;
}

export abstract class Schema<TInput, TOutput = TInput> {
  readonly _type!: TInput;
  readonly _output!: TOutput;
  /**
   * Store the tests of child Schemas or user-defined tests
   */
  protected tests: Test[] = [];

  protected exclusiveTests: Record<string, boolean> = {};

  /**
   * Store the tests of the base Schema (all internal tests are exclusive)
   */
  protected internalTests: Record<string, InternalTest | null> = {};

  protected typeCheck: (value: any) => boolean;
  protected type: string;
  private mutable = false;

  abstract errors: Error[];

  protected spec: SchemaSpec;

  constructor({ type, check }: { type: string; check: (value: any) => boolean }) {
    this.typeCheck = check;
    this.type = type;

    this.spec = {
      nullable: false,
      optional: true
    };
  }

  clone(): this {
    const deepClonedInstance = Object.create(this) as this;

    deepClonedInstance.tests = [...this.tests];
    deepClonedInstance.exclusiveTests = { ...this.exclusiveTests };
    deepClonedInstance.internalTests = { ...this.internalTests };
    deepClonedInstance.spec = { ...this.spec };

    return deepClonedInstance;
  }

  protected mutate(callback: (self: this) => this): this {
    if (this.mutable) return callback(this);

    const next = this.clone();
    next.mutable = true;

    try {
      return callback(next);
    } finally {
      next.mutable = false;
    }
  }

  protected nullability(nullable: boolean, message: Message = 'Nullability test failed') {
    return this.mutate((next) => {
      next.spec.nullable = nullable;

      next.internalTests.nullable = {
        message: message,
        name: 'nullable',
        test(value) {
          return value === null ? next.spec.nullable : true;
        }
      };
      return next;
    });
  }

  protected optionality(optional: boolean, message: Message = 'Optionality test failed') {
    return this.mutate((next) => {
      next.spec.optional = optional;

      next.internalTests.optionality = {
        message: message,
        name: 'optionality',
        test(value) {
          return value === undefined ? next.spec.optional : true;
        }
      };
      return next;
    });
  }

  optional(): Schema<TInput | undefined, TOutput | undefined> {
    return this.optionality(true);
  }

  nullable(): Schema<TInput | null, TOutput | null> {
    return this.nullability(true);
  }

  nonNullable(message: Message = 'The value must not be null'): Schema<NonNullable<TInput>, NonNullable<TOutput>> {
    return this.nullability(false, message) as Schema<NonNullable<TInput>, NonNullable<TOutput>>;
  }

  required(message: Message = 'Required'): Schema<NonNullable<TInput>, NonNullable<TOutput>> {
    return this.nonNullable().optionality(false, message) as Schema<NonNullable<TInput>, NonNullable<TOutput>>;
  }

  // nonRequired(): this {
  //   return this.nullable().optional();
  // }

  // Add a test to the `tests` array
  addTest(opts: Test): this {
    opts.message = opts.message || 'Default Error';

    if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');

    const next = this.clone();

    const isExclusive = opts.exclusive || (opts.name && next.exclusiveTests[opts.name]);

    if (opts.exclusive) {
      if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
    }

    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;

    next.tests = next.tests.filter((fn) => {
      if (fn.name === opts.name) {
        if (isExclusive) return false;
        if (fn.test === opts.test) return false;
      }
      return true;
    });

    next.tests.push(opts);

    return next;
  }

  isType(v: unknown): boolean {
    if (v == null) {
      if (this.spec.nullable && v === null) return true;
      if (this.spec.optional && v === undefined) return true;
      return false;
    }

    return this.typeCheck(v);
  }

  // safeValidate(value: any): FieldsErrors<any> {
  //   this.errors = {};
  //   for (const test of Object.values(this.internalTests)) {
  //     if (test && !test.test(value)) {
  //       this.errors = { ...this.errors, [test.name]: [test.message] };
  //     }
  //   }

  //   if (!this.isType(value)) {
  //     this.errors = { ...this.errors, type: [`The value must be of type ${this.type}`] };
  //   }

  //   if (value == null) return this.errors;

  //   for (const test of this.tests) {
  //     if (!test.test(value)) {
  //       this.errors = { ...this.errors, [test.name]: [test.message] };
  //     }
  //   }

  //   return this.errors;
  // }

  safeValidate(value: any): Error[] {
    this.errors = [];
    for (const test of Object.values(this.internalTests)) {
      if (test && !test.test(value)) {
        this.errors.push({ code: test.name, message: test.message });
      }
    }

    if (!this.isType(value)) {
      this.errors.push({ code: 'invalid_type', message: `Expected ${this.type}, but received ${typeof value}` });
    }

    if (value == null) return this.errors;

    for (const test of this.tests) {
      if (!test.test(value)) {
        this.errors.push({ code: test.name, message: test.message });
      }
    }

    return this.errors;
  }
}
