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
  
    // ---------- Scroll Reveal Animation ----------
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);
  
    // Observe all sections and cards for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      // Add delay based on order
      section.style.transitionDelay = `${index * 0.1}s`;
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });
  
    // Observe cards within sections
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 4) * 0.1}s`;
      card.classList.add('scroll-reveal');
      observer.observe(card);
    });
  
  // ---------- Initial Page Load Animation ----------
  window.addEventListener('load', () => {
    // Mark body as loaded
    document.body.classList.add('loaded');
    
      // Animate header
      const header = document.querySelector('.site-header');
      if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
        }, 100);
      }
  
      // Animate hero section elements
      const heroElements = document.querySelectorAll('.hero-left > *');
      heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
      });
  
      // Animate hero right side
      const heroRight = document.querySelector('.hero-right');
      if (heroRight) {
        heroRight.style.opacity = '0';
        heroRight.style.transform = 'translateX(30px)';
        heroRight.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
          heroRight.style.opacity = '1';
          heroRight.style.transform = 'translateX(0)';
        }, 400);
      }
    });
  
    // ---------- Smooth Scroll with offset ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ---------- Parallax Effect on Scroll ----------
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect on hero section
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.3}px)`;
          hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // ---------- Add cursor pointer to interactive elements ----------
  const interactiveElements = document.querySelectorAll('.card, .chip, .tag');
  interactiveElements.forEach(el => {
    if (!el.querySelector('a') && !el.querySelector('button')) {
      el.style.cursor = 'default';
    }
  });
  })();
  