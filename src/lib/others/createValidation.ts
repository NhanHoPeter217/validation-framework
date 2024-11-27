export type TestFunction = (value: any) => boolean | Promise<boolean>;

/**
 * Configuration for a validation test.
 */
export interface Test {
  name: string;

  /**
   * The test function that determines schema validity.
   * @param value - Test value.
   * @returns A boolean indicating whether the value is valid.
   */
  test: TestFunction;

  /**
   * The validation error message.
   */
  message: string;

  /**
   * Values passed to the message for interpolation.
   */
  params?: object | null;

  /**
   * Marks the test as exclusive, meaning only one test of the same name can be active at once.
   */
  exclusive: boolean;
}

export type InternalTest = Omit<Test, 'params' | 'exclusive'>;
