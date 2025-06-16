// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock TextEncoder/TextDecoder
global.TextEncoder = class TextEncoder {
  encode() {
    return new Uint8Array();
  }
};

global.TextDecoder = class TextDecoder {
  decode() {
    return "";
  }
};

// Mock window.scrollTo
window.scrollTo = jest.fn();
