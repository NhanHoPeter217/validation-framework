import { InternalTest, Test } from '../others/createValidation';
import { Message, ValidationError } from '../errors/ValidationError';

export type SchemaSpec = {
  nullable: boolean;
  optional: boolean;
};

export abstract class Schema<T> {
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

  abstract errors: ValidationError[];

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
    const next = Object.create(this) as this;
    return Object.assign(next, this);
  }

  protected nullability(nullable: boolean, message?: Message) {
    const next = this.clone();

    next.spec.nullable = nullable;

    next.internalTests.nullable = {
      message: message ?? 'Nullability test failed',
      name: 'nullable',
      test(value) {
        return value === null ? next.spec.nullable : true;
      }
    };
    return next;
  }

  protected optionality(optional: boolean, message?: Message) {
    const next = this.clone();

    next.spec.optional = optional;

    next.internalTests.optionality = {
      message: message ?? 'Optionality test failed',
      name: 'optionality',
      test(value) {
        return value === undefined ? next.spec.optional : true;
      }
    };
    return next;
  }

  optional(): this {
    return this.optionality(true);
  }
  defined(message = 'The value must be defined'): this {
    return this.optionality(false, message);
  }

  nullable(): this {
    return this.nullability(true);
  }
  nonNullable(message = 'The value must not be null'): this {
    return this.nullability(false, message);
  }

  required(): this {
    return this.nonNullable().defined();
  }
  nonRequired(): this {
    return this.optional().nullable();
  }

  // Add a test to the `tests` array
  addTest(opts: Test): this {
    if (opts.message === undefined) opts.message = 'Default Error';

    if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');

    const next = this.clone();

    const isExclusive = opts.exclusive || (opts.name && next.exclusiveTests[opts.name] === true);

    if (opts.exclusive) {
      if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
    }

    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;

    next.tests = next.tests.filter((fn) => {
      if (fn.name === opts.name) {
        if (isExclusive) return false;
        if (fn.test === test) return false;
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

  safeValidate(value: any): ValidationError[] {
    this.errors = [];
    for (const test of Object.values(this.internalTests)) {
      if (!test.test(value)) {
        this.errors.push(test.message);
      }
    }

    if (!this.isType(value)) {
      this.errors.push(`The value must be of type ${this.type}`);
    }

    if (value == null) return this.errors;

    for (const test of this.tests) {
      if (!test.test(value)) {
        this.errors.push(test.message);
      }
    }

    return this.errors;
  }
}
