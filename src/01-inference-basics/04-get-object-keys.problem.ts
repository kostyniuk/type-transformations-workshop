import { Equal, Expect } from "../helpers/type-utils";

const testingFrameworks = {
  vitest: {
    label: "Vitest",
  },
  jest: {
    label: "Jest",
  },
  mocha: {
    label: "Mocha",
  },
};

console.log(Object.keys(testingFrameworks))

type TestingFrameworks = typeof testingFrameworks

type TestingFramework = keyof TestingFrameworks;

type tests = [Expect<Equal<TestingFramework, "vitest" | "jest" | "mocha">>];
