tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const backToTopButton = document.getElementById("back-to-top");

  // Handle scroll events
  window.addEventListener("scroll", function () {
    // Header styling on scroll
    if (window.scrollY > 50) {
      header.classList.add("h-16", "shadow-md");
      header.classList.remove("h-20", "shadow-sm");
    } else {
      header.classList.remove("h-16", "shadow-md");
      header.classList.add("h-20", "shadow-sm");
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTopButton.classList.remove("opacity-0", "invisible");
      backToTopButton.classList.add("opacity-100", "visible");
    } else {
      backToTopButton.classList.add("opacity-0", "invisible");
      backToTopButton.classList.remove("opacity-100", "visible");
    }
  });

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    // Toggle icon
    const icon = mobileMenuButton.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-line");
    } else {
      icon.classList.remove("ri-menu-line");
      icon.classList.add("ri-close-line");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuButton.querySelector("i");
      icon.classList.remove("ri-close-line");
      icon.classList.add("ri-menu-line");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme or default to light
  if (savedTheme === "dark") {
    html.classList.add("dark");
    themeToggle.checked = true;
  }

  // Toggle theme on switch change
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-primary", "text-white");
        btn.classList.add("text-gray-700", "hover:bg-gray-200");
      });

      // Add active class to clicked button
      this.classList.add("active", "bg-primary", "text-white");
      this.classList.remove("text-gray-700", "hover:bg-gray-200");

      const filter = this.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-progress");

  // Reset all skill bars to 0 width
  skillBars.forEach((bar) => {
    bar.style.width = "0";
  });

  // Function to animate skill bars when they come into view
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (barPosition < screenPosition) {
        const width =
          bar.parentElement.previousElementSibling.querySelector(
            "span:last-child"
          ).textContent;
        bar.style.width = width;
      }
    });
  }

  // Initial check
  animateSkillBars();

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars);
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Simulate form submission
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursor-dot");

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .project-card"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursor.style.width = "60px";
        cursor.style.height = "60px";
        cursor.style.borderColor = "#3b82f6";

        cursorDot.style.width = "0";
        cursorDot.style.height = "0";
      });

      element.addEventListener("mouseleave", function () {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.borderColor = "#3b82f6";

        cursorDot.style.width = "8px";
        cursorDot.style.height = "8px";
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const parallaxElements = document.querySelectorAll(".parallax");

  window.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed");
      const x = (window.innerWidth - mouseX * speed) / 100;
      const y = (window.innerHeight - mouseY * speed) / 100;

      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
});