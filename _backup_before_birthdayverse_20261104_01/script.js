console.log("BirthVerse JavaScript connected");

/* ============================================================
   NAVIGATION (Phase 2A)
   - Desktop sidebar nav + mobile bottom nav: scroll to section,
     update active state on the clicked control.
   - Theme dropdown: open/close, apply data-theme to <html>,
     persist choice to localStorage.
   Native link behavior (href="#id") is preserved; we only
   enhance the active-state highlight and close the dropdown.
   ============================================================ */

(function () {
  "use strict";

  var SECTIONS = ["hero", "countdown", "cake", "wishes", "games", "gallery", "gift", "finale"];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function setActiveNav(section) {
    var links = document.querySelectorAll(".nav-link[data-section], .b-nav-item[data-section]");
    links.forEach(function (link) {
      var active = link.getAttribute("data-section") === section;
      link.classList.toggle("active", active);
    });
  }

  // Clicking a nav link scrolls to the section and highlights it.
  // Native href="#id" scrolling still works; we just sync the active state.
  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest(".nav-link[data-section], .b-nav-item[data-section]") : null;
    if (!link) return;
    var section = link.getAttribute("data-section");
    if (section && SECTIONS.indexOf(section) !== -1) {
      var target = document.getElementById(section);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveNav(section);
        // Close any open mobile nav / dropdowns on small screens
        closeThemeMenu();
      }
    }
  });

  // Update active nav link based on scroll position (intersection-style fallback).
  function updateActiveOnScroll() {
    var scrollPos = window.scrollY + 120;
    var current = "hero";
    SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });
    setActiveNav(current);
  }
  window.addEventListener("scroll", updateActiveOnScroll, { passive: true });

  /* ---------- Theme Dropdown ---------- */
  var themeMenuBtn = $("#themeMenuBtn");
  var themeMenu = $("#themeMenu");
  var themeNameEl = $("#themeName");

  function closeThemeMenu() {
    if (themeMenu) themeMenu.classList.add("hidden");
  }

  function openThemeMenu() {
    if (themeMenu) themeMenu.classList.remove("hidden");
  }

  function toggleThemeMenu(e) {
    e.stopPropagation();
    if (!themeMenu) return;
    themeMenu.classList.toggle("hidden");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("birthVerse-theme", theme); } catch (err) {}
    if (themeNameEl) {
      var labels = {
        neon: "Neon Party", pastel: "Pastel Dream", retro: "Retro Arcade",
        galaxy: "Galaxy Void", candy: "Candy Pop"
      };
      themeNameEl.textContent = labels[theme] || theme;
    }
    // Sync active option in the dropdown
    var options = themeMenu ? themeMenu.querySelectorAll(".theme-option") : [];
    options.forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-theme") === theme);
    });
  }

  if (themeMenuBtn) themeMenuBtn.addEventListener("click", toggleThemeMenu);
  document.addEventListener("click", function (e) {
    if (themeMenu && !themeMenu.contains(e.target) && themeMenuBtn && !themeMenuBtn.contains(e.target)) {
      closeThemeMenu();
    }
  });

  var themeOptions = themeMenu ? themeMenu.querySelectorAll(".theme-option") : [];
  themeOptions.forEach(function (opt) {
    opt.addEventListener("click", function () {
      applyTheme(opt.getAttribute("data-theme"));
      closeThemeMenu();
    });
  });

  // Restore persisted theme on load
  (function restoreTheme() {
    var saved = null;
    try { saved = localStorage.getItem("birthVerse-theme"); } catch (err) {}
    var htmlTheme = document.documentElement.getAttribute("data-theme");
    applyTheme(saved || htmlTheme || "neon");
  })();

  // Initial active state
  setActiveNav("hero");
})();