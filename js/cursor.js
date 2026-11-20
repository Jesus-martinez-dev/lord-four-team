/**
 * FORDS FOUR TEAM - CURSOR & 3D TILT ENGINE
 * Features:
 *  1. Smooth Lerp Cursor Follower with Dynamic Labels ("Ver Obra", "Explorar", etc.)
 *  2. 3D Tilt & Dynamic Spotlight on interactive cards
 *  3. Interactive 60 FPS Particle Canvas Mesh reacting to mouse movement
 */

(function () {
  'use strict';

  // Check if device has touch screen or coarse pointer
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  /* ==========================================================================
     1. CUSTOM INTERACTIVE CURSOR WITH LERP
     ========================================================================== */
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorFollower = document.getElementById('custom-cursor-follower');
  const cursorLabel = document.getElementById('cursor-label');

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isCursorVisible = false;

  if (!isTouchDevice && cursorDot && cursorFollower) {
    // Track Mouse Position
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        isCursorVisible = true;
        cursorDot.style.opacity = '1';
        cursorFollower.style.opacity = '1';
      }

      // Dot follows directly for immediate precision
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      isCursorVisible = false;
      cursorDot.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      isCursorVisible = true;
      cursorDot.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });

    // Smooth Lerp Animation Loop (60 FPS)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    function renderCursor() {
      if (isCursorVisible) {
        followerX = lerp(followerX, mouseX, 0.16);
        followerY = lerp(followerY, mouseY, 0.16);

        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Dynamic Hover & Label Attachment
    function bindCursorTriggers() {
      const interactiveElements = document.querySelectorAll('[data-cursor], a, button, input, select, textarea, .gallery-card, .tilt-card');

      interactiveElements.forEach((el) => {
        // Prevent duplicate listeners
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = 'true';

        el.addEventListener('mouseenter', () => {
          const customText = el.getAttribute('data-cursor');

          if (customText) {
            cursorLabel.textContent = customText;
            cursorFollower.classList.add('has-label');
            cursorFollower.classList.remove('hovering');
            cursorDot.classList.add('hovering');
          } else {
            cursorFollower.classList.add('hovering');
            cursorFollower.classList.remove('has-label');
            cursorDot.classList.add('hovering');
          }
        });

        el.addEventListener('mouseleave', () => {
          cursorFollower.classList.remove('has-label');
          cursorFollower.classList.remove('hovering');
          cursorDot.classList.remove('hovering');
          cursorLabel.textContent = '';
        });
      });
    }

    // Initialize and expose trigger refresher
    bindCursorTriggers();
    window.refreshCursorTriggers = bindCursorTriggers;
  }

  /* ==========================================================================
     2. 3D TILT EFFECT & DYNAMIC SPOTLIGHT ON CARDS
     ========================================================================== */
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      const maxTilt = parseFloat(card.dataset.tiltMax) || 10;
      const scaleVal = parseFloat(card.dataset.tiltScale) || 1.02;

      let bounds;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      card.addEventListener('mouseenter', () => {
        updateBounds();
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
      });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) updateBounds();

        const mouseXRel = e.clientX - bounds.left;
        const mouseYRel = e.clientY - bounds.top;

        // Normalized offsets from -1 to 1
        const xPct = (mouseXRel / bounds.width - 0.5) * 2;
        const yPct = (mouseYRel / bounds.height - 0.5) * 2;

        const rotX = -yPct * maxTilt;
        const rotY = xPct * maxTilt;

        // Set card tilt transform
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;

        // Set spotlight CSS variables
        card.style.setProperty('--spot-x', `${mouseXRel}px`);
        card.style.setProperty('--spot-y', `${mouseYRel}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // Initialize tilt cards
  initTiltCards();
  window.initTiltCards = initTiltCards;

  /* ==========================================================================
     3. INTERACTIVE 60 FPS PARTICLE CANVAS BACKGROUND
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle settings
    const particleCount = window.innerWidth < 768 ? 35 : 75;
    const particles = [];
    const connectionDistance = 110;
    const mouseRadius = 140;

    let canvasMouse = {
      x: -1000,
      y: -1000,
    };

    window.addEventListener('mousemove', (e) => {
      canvasMouse.x = e.clientX;
      canvasMouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle Object
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        // Palettes: Gold, Cyan, Arcane Purple
        const colors = [
          'rgba(212, 175, 55, ',  // Gold
          'rgba(0, 229, 255, ',    // Cyan
          'rgba(168, 85, 247, ',   // Purple
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Gentle reaction to mouse
        const dx = canvasMouse.x - this.x;
        const dy = canvasMouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          // Push away slightly
          this.x -= Math.cos(angle) * force * 1.2;
          this.y -= Math.sin(angle) * force * 1.2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor}${this.alpha})`;
        ctx.shadowColor = `${this.baseColor}0.8)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    let animationFrameId;

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update each particle
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Respect page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animateParticles);
      }
    });

    // Start particle loop
    animateParticles();
  }
})();
