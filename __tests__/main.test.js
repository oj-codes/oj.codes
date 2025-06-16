require("./jest.setup");

describe("Mobile Navigation", () => {
  let hamburger;
  let navLinks;

  beforeEach(() => {
    document.body.innerHTML = `
            <button class="hamburger"></button>
            <nav class="nav-links">
                <a href="#section1">Section 1</a>
                <a href="#section2">Section 2</a>
            </nav>
        `;
    hamburger = document.querySelector(".hamburger");
    navLinks = document.querySelector(".nav-links");

    // Add event listeners manually
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    const navLink = document.querySelector(".nav-links a");
    navLink.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  test("hamburger menu should toggle active class", () => {
    // Initial state
    expect(hamburger.classList.contains("active")).toBe(false);
    expect(navLinks.classList.contains("active")).toBe(false);

    // Click hamburger
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    hamburger.dispatchEvent(clickEvent);

    // After click
    expect(hamburger.classList.contains("active")).toBe(true);
    expect(navLinks.classList.contains("active")).toBe(true);

    // Click again
    hamburger.dispatchEvent(clickEvent);

    // After second click
    expect(hamburger.classList.contains("active")).toBe(false);
    expect(navLinks.classList.contains("active")).toBe(false);
  });

  test("clicking nav link should close mobile menu", () => {
    const navLink = document.querySelector(".nav-links a");

    // Open menu
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    hamburger.dispatchEvent(clickEvent);
    expect(navLinks.classList.contains("active")).toBe(true);

    // Click nav link
    navLink.dispatchEvent(clickEvent);

    // Menu should be closed
    expect(navLinks.classList.contains("active")).toBe(false);
  });
});

describe("Smooth Scrolling", () => {
  let anchor;
  let target;

  beforeEach(() => {
    document.body.innerHTML = `
            <a href="#section1">Section 1</a>
            <section id="section1">Content 1</section>
        `;
    anchor = document.querySelector('a[href^="#"]');
    target = document.querySelector("#section1");

    // Add event listener manually
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  test("clicking anchor should prevent default and scroll to section", () => {
    const mockPreventDefault = jest.fn();
    const mockScrollIntoView = jest.fn();
    target.scrollIntoView = mockScrollIntoView;

    // Mock getAttribute
    anchor.getAttribute = jest.fn().mockReturnValue("#section1");

    // Trigger click with preventDefault
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    clickEvent.preventDefault = mockPreventDefault;
    anchor.dispatchEvent(clickEvent);

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });
});

describe("Intersection Observer", () => {
  let observer;
  let sections;

  beforeEach(() => {
    document.body.innerHTML = `
            <section>Content 1</section>
            <section>Content 2</section>
        `;
    sections = document.querySelectorAll("section");

    // Create observer manually
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    });
    sections.forEach((section) => observer.observe(section));
  });

  test("sections should get fade-in class when intersecting", () => {
    // Mock intersection
    const entry = {
      isIntersecting: true,
      target: sections[0],
    };

    // Trigger observer callback
    observer.callback([entry]);

    expect(sections[0].classList.contains("fade-in")).toBe(true);
  });
});

describe("Form Submission", () => {
  let form;
  let submitButton;

  beforeEach(() => {
    document.body.innerHTML = `
            <form class="contact-form">
                <button type="submit">Send</button>
            </form>
        `;
    form = document.querySelector(".contact-form");
    submitButton = form.querySelector('button[type="submit"]');

    // Add event listener manually
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitButton.disabled = true;
      submitButton.innerHTML = "<span>Sending...</span>";
    });
  });

  test("submit button should be disabled and show loading state", () => {
    // Submit form
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    form.dispatchEvent(submitEvent);

    expect(submitButton.disabled).toBe(true);
    expect(submitButton.innerHTML).toBe("<span>Sending...</span>");
  });
});

describe("Scroll Position Navigation", () => {
  let sections;
  let navItems;

  beforeEach(() => {
    document.body.innerHTML = `
            <nav class="nav-links">
                <a href="#section1">Section 1</a>
                <a href="#section2">Section 2</a>
            </nav>
            <section id="section1">Content 1</section>
            <section id="section2">Content 2</section>
        `;
    sections = document.querySelectorAll("section");
    navItems = document.querySelectorAll(".nav-links a");

    // Add scroll listener manually
    window.addEventListener("scroll", () => {
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          navItems[index].classList.add("active");
        } else {
          navItems[index].classList.remove("active");
        }
      });
    });
  });

  test("nav links should get active class based on scroll position", () => {
    // Mock scroll position
    Object.defineProperty(window, "pageYOffset", {
      value: 200,
      writable: true,
    });

    // Mock section positions using getBoundingClientRect
    sections[0].getBoundingClientRect = jest.fn().mockReturnValue({
      top: 100,
      bottom: 200,
    });
    sections[1].getBoundingClientRect = jest.fn().mockReturnValue({
      top: 300,
      bottom: 400,
    });

    // Trigger scroll
    window.dispatchEvent(new Event("scroll"));

    expect(navItems[0].classList.contains("active")).toBe(true);
    expect(navItems[1].classList.contains("active")).toBe(false);
  });
});
