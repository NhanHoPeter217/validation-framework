export declare type TestFunction = (value: any) => void | boolean | Promise<boolean>;
export declare type Test = {
  name: string;
  test: TestFunction;
  message: string;
  params?: object | null;
  exclusive: boolean;
};
export declare type InternalTest = Omit<Test, 'params' | 'exclusive'>;
export declare type Maybe<T> = T | null | undefined;

