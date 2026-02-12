(function () {
    const root = document.documentElement;
    const themeBtn = document.getElementById("themeToggle");
    const yearEl = document.getElementById("year");
  
    // Footer year
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Theme: default to dark unless user already chose
  const stored = localStorage.getItem("theme"); // "light" | "dark"
  const initialTheme = stored === "dark" || stored === "light" ? stored : "dark";
  root.setAttribute("data-theme", initialTheme);
  
  function nextTheme(current) {
    // Simple toggle: light <-> dark
    return current === "dark" ? "light" : "dark";
  }
  
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
    if (themeBtn) {
      const label = `Theme: ${t[0].toUpperCase()}${t.slice(1)}`;
      themeBtn.setAttribute("aria-label", label);
    }
  }
  
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "system";
        setTheme(nextTheme(current));
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
        const hero = document.querySelector('.hero-landing');
        if (hero && scrolled < window.innerHeight) {
          const heroContent = hero.querySelector('.hero-content');
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
          }
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

  // ---------- Particle Effect ----------
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        const isDark = root.getAttribute('data-theme') === 'dark';
        const color = isDark ? '59, 130, 246' : '37, 99, 235';
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function initParticles() {
      particles = [];
      const isMobile = window.innerWidth < 900;
      const density = isMobile ? 20000 : 15000;
      const maxParticles = isMobile ? 40 : 80;
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / density), maxParticles);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }
    
    function connectParticles() {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const color = isDark ? '59, 130, 246' : '37, 99, 235';
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
    
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }
})();
  