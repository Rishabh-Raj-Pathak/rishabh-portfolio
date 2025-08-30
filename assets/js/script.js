/**
 * Rishabh Raj Pathak - Portfolio Interactive Functionality
 * Author: Rishabh Raj Pathak
 * Email: rishabhrajpathak06@gmail.com
 * Description: Custom JavaScript for portfolio website interactions
 * Features: Navigation, Filtering, Modal handling, Form validation
 */

"use strict";

// Utility Functions
// =================

// Element toggle functionality - reusable utility
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar Management
// ==================
// Mobile-responsive sidebar with smooth toggle animations

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Enhanced sidebar toggle with accessibility considerations
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);

  // Update ARIA attributes for screen readers
  const isExpanded = sidebar.classList.contains("active");
  sidebarBtn.setAttribute("aria-expanded", isExpanded);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items (only if they exist)
if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector(
        "[data-testimonials-title]"
      ).innerHTML;
      modalText.innerHTML = this.querySelector(
        "[data-testimonials-text]"
      ).innerHTML;

      testimonialsModalFunc();
    });
  }
}

// add click event to modal close button (only if elements exist)
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add select events if elements exist
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
if (selectItems.length > 0 && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      if (select) {
        elementToggleFunc(select);
      }
      filterFunc(selectedValue);
    });
  }
}

// Project Portfolio Filtering System
// ==================================
// Custom filtering logic for my portfolio projects
// Categories: Frontend, Full Stack, All

const filterItems = document.querySelectorAll("[data-filter-item]");

/**
 * Enhanced filter function with smooth animations
 * @param {string} selectedValue - The category to filter by ("all", "frontend", "full stack")
 */
const filterFunc = function (selectedValue) {
  // Iterate through all project items and apply filter logic
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      // Show all projects
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      // Show projects matching the selected category
      filterItems[i].classList.add("active");
    } else {
      // Hide projects that don't match
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field (only if form exists)
if (form && formBtn && formInputs.length > 0) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// Single Page Application Navigation
// =================================
// Custom SPA-style navigation for seamless user experience
// Handles: About, Resume, Projects sections

function initPageNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Debug information for development
  console.log("🚀 Initializing Rishabh's Portfolio Navigation...");
  console.log("📋 Navigation links found:", navigationLinks.length);
  console.log("📄 Pages found:", pages.length);

  if (navigationLinks.length === 0 || pages.length === 0) {
    console.error("Navigation elements not found!");
    return;
  }

  // add event to all nav links
  navigationLinks.forEach((navLink, index) => {
    navLink.addEventListener("click", function () {
      const targetPage = this.textContent.toLowerCase().trim();

      console.log("Clicked nav link:", targetPage);
      console.log("Looking for page with data-page:", targetPage);

      // Remove active class from all pages
      pages.forEach((page) => {
        page.classList.remove("active");
      });

      // Remove active class from all nav links
      navigationLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Find and activate the target page
      let pageFound = false;
      pages.forEach((page) => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
          pageFound = true;
          console.log("✅ Page activated:", targetPage);
        }
      });

      if (!pageFound) {
        console.error("❌ Page not found:", targetPage);
        console.log(
          "Available pages:",
          Array.from(pages).map((p) => p.dataset.page)
        );
      }

      // Activate the clicked nav link
      this.classList.add("active");

      // Scroll to top
      window.scrollTo(0, 0);
    });
  });

  console.log("✅ Navigation initialized successfully");
}

// Internal Navigation Links Handler
// =================================
// Handles clicks on internal section links within content

function initInternalNavigation() {
  const internalLinks = document.querySelectorAll(
    ".internal-link[data-nav-target]"
  );
  const pages = document.querySelectorAll("[data-page]");
  const navigationLinks = document.querySelectorAll("[data-nav-link]");

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetSection = this.getAttribute("data-nav-target");
      console.log("🔗 Internal link clicked:", targetSection);

      // Remove active class from all pages
      pages.forEach((page) => {
        page.classList.remove("active");
      });

      // Remove active class from all nav links
      navigationLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      // Find and activate target page
      const targetPage = document.querySelector(
        `[data-page="${targetSection}"]`
      );
      if (targetPage) {
        targetPage.classList.add("active");
        console.log("✅ Internal navigation successful:", targetSection);

        // Also activate corresponding nav link
        navigationLinks.forEach((navLink) => {
          if (navLink.textContent.toLowerCase().trim() === targetSection) {
            navLink.classList.add("active");
          }
        });

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.error("❌ Target section not found:", targetSection);
      }
    });
  });

  console.log(
    "🔗 Internal navigation initialized with",
    internalLinks.length,
    "links"
  );
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initPageNavigation();
    initInternalNavigation();
  });
} else {
  initPageNavigation();
  initInternalNavigation();
}

/**
 * ========================================
 * End of Rishabh's Portfolio JavaScript
 * ========================================
 *
 * This script powers the interactive elements of my portfolio.
 * Every function has been carefully crafted to provide the best
 * user experience while maintaining clean, readable code.
 *
 * © 2024 Rishabh Raj Pathak
 * rishabhrajpathak06@gmail.com
 *
 * "The best code is not just functional, but elegant."
 * ========================================
 */
