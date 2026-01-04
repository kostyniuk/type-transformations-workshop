import { Equal, Expect } from "../helpers/type-utils";

const myFunc = () => {
  return "hello";
};

/**
 * How do we extract MyFuncReturn from myFunc?
 */
type MyFunc = typeof myFunc;
type MyFuncReturn = ReturnType<MyFunc>;

// oxlint-disable-next-line no-unused-vars
type tests = [Expect<Equal<MyFuncReturn, string>>]; 