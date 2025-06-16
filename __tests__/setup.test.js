require("./jest.setup");

describe("Setup Mocks", () => {
  test("IntersectionObserver should be defined", () => {
    expect(global.IntersectionObserver).toBeDefined();
    const observer = new IntersectionObserver(() => {});
    expect(observer.observe).toBeDefined();
    expect(observer.unobserve).toBeDefined();
    expect(observer.disconnect).toBeDefined();
  });

  test("TextEncoder should be defined", () => {
    expect(global.TextEncoder).toBeDefined();
    const encoder = new TextEncoder();
    expect(encoder.encode).toBeDefined();
    expect(encoder.encode()).toBeInstanceOf(Uint8Array);
  });

  test("TextDecoder should be defined", () => {
    expect(global.TextDecoder).toBeDefined();
    const decoder = new TextDecoder();
    expect(decoder.decode).toBeDefined();
    expect(typeof decoder.decode()).toBe("string");
  });

  test("window.scrollTo should be defined", () => {
    expect(window.scrollTo).toBeDefined();
    expect(typeof window.scrollTo).toBe("function");
  });
});
