(function () {
    const root = document.documentElement;
    const themeBtn = document.getElementById("themeToggle");
    const yearEl = document.getElementById("year");
    const menuBtn = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
  
    // Footer year
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Theme: default to system unless user already chose
    const stored = localStorage.getItem("theme"); // "light" | "dark" | "system"
    if (stored) {
      root.setAttribute("data-theme", stored);
    } else {
      root.setAttribute("data-theme", "system");
    }
  
    function nextTheme(current) {
      // Cycle: system -> dark -> light -> system
      if (current === "system") return "dark";
      if (current === "dark") return "light";
      return "system";
    }
  
    function setTheme(t) {
      root.setAttribute("data-theme", t);
      localStorage.setItem("theme", t);
      if (themeBtn) {
        const label = t === "system" ? "Theme: System" : `Theme: ${t[0].toUpperCase()}${t.slice(1)}`;
        themeBtn.setAttribute("aria-label", label);
      }
    }
  
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "system";
        setTheme(nextTheme(current));
      });
    }
  
    // Mobile menu
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", () => {
        const open = !mobileNav.hasAttribute("hidden");
        if (open) {
          mobileNav.setAttribute("hidden", "");
          menuBtn.setAttribute("aria-expanded", "false");
        } else {
          mobileNav.removeAttribute("hidden");
          menuBtn.setAttribute("aria-expanded", "true");
        }
      });
  
      // Close menu after clicking a link
      mobileNav.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        mobileNav.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    }
  })();
  