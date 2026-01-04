// TypeScript will catch: NONE of these (they're all type-safe!)
// Oxlint (syntax-only) will catch: maybe the unused variable
// Oxlint + tsgolint will catch: ALL the critical bugs

// 1. FLOATING PROMISES - TypeScript sees no error, but it's a bug
function fetchData(): Promise<string> {
    return Promise.resolve("data");
  }
  
  // ❌ BUG: Promise not handled (no await, .then(), or .catch())
  // TypeScript: ✅ No error (return type is compatible)
  // Oxlint + tsgolint: ❌ typescript/no-floating-promises
  fetchData();
  
  // 2. MISUSED PROMISES - Promise in conditional
  const myPromise = Promise.resolve(true);
  
  // ❌ BUG: Checking Promise truthiness instead of awaiting
  // TypeScript: ✅ No error (Promise is truthy)
  // Oxlint + tsgolint: ❌ typescript/no-misused-promises
  if (myPromise) {
    console.log("This is wrong!");
  }
  
  // 3. UNSAFE ASSIGNMENT from `any`
  declare const untypedData: any;
  
  // ❌ BUG: Assigning any to typed variable
  // TypeScript: ✅ No error (any is assignable to everything)
  // Oxlint + tsgolint: ❌ typescript/no-unsafe-assignment
  const safeString: string = untypedData;
  
  // 4. VOID RETURN CONTEXT with async
  const items = [1, 2, 3];
  
  // ❌ BUG: async function in void-returning forEach
  // TypeScript: ✅ No error (forEach accepts any function)
  // Oxlint + tsgolint: ❌ typescript/no-misused-promises
  items.forEach(async (item) => {
    await fetch(`/api/${item}`);
  });
  
  // 5. DEPRECATED API usage
  /**
   * @deprecated Use newApi() instead
   */
  function oldApi(): void {
    console.log("old");
  }
  
  function newApi(): void {
    console.log("new");
  }
  
  // ❌ BUG: Using deprecated function
  // TypeScript: ⚠️ Might show strikethrough in IDE
  // Oxlint + tsgolint: ❌ typescript/no-deprecated
  oldApi();
  
  // 6. SAFE CODE - No errors anywhere
  // TypeScript: ✅ No error
  // Oxlint: ✅ No error
  // Oxlint + tsgolint: ✅ No error
  async function correctImplementation() {
    const data = await fetchData(); // ✅ Properly awaited
    if (data) { // ✅ Checking string value, not Promise
      console.log(data);
    }
  }
  
  // 7. UNUSED VARIABLE - Syntax-only rule
  const unusedVar = "this is unused";
  
  // TypeScript: ✅ No error
  // Oxlint: ❌ no-unused-vars (syntax rule)
  // Oxlint + tsgolint: ❌ no-unused-vars (syntax rule)