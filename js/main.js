/**
 * FORDS FOUR TEAM - MAIN UI & INTERACTION CONTROLLER
 * Features:
 *  1. Sticky navigation header & active section observer
 *  2. Mobile drawer menu toggle & keyboard accessibility
 *  3. Scroll Reveal animations via IntersectionObserver
 *  4. Commission form validation, tier pre-selection & feedback toast
 *  5. Wishlist toggle & smooth anchor navigation
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success', duration = 4000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconSvg = type === 'success' 
      ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ff3366" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, duration);
  }

  window.showToast = showToast;

  /* ==========================================================================
     2. STICKY HEADER & ACTIVE SECTION HIGHLIGHTING
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header background blur on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Detection
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer if clicked outside
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer &&
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  /* ==========================================================================
     4. SMOOTH SCROLL FOR ALL ANCHORS WITH FIXED HEADER OFFSET
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ==========================================================================
     5. SCROLL REVEAL (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     6. INTERACTIVE COMMISSION FORM & TIER PRE-SELECTION
     ========================================================================== */
  const commissionForm = document.getElementById('commission-form');
  const artistSelect = document.getElementById('artist-select');
  const commissionTypeSelect = document.getElementById('commission-type');
  const selectTierButtons = document.querySelectorAll('.select-tier-btn');
  const selectArtistButtons = document.querySelectorAll('.select-artist-btn');
  const submitBtn = document.getElementById('submit-btn');

  // Handle "Seleccionar este Nivel" clicks in tiers
  selectTierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tierName = btn.getAttribute('data-tier');
      if (commissionTypeSelect) {
        // Find matching option or set value
        for (let i = 0; i < commissionTypeSelect.options.length; i++) {
          if (commissionTypeSelect.options[i].value === tierName) {
            commissionTypeSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Smooth scroll to form
      const formSection = document.getElementById('comisiones');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Highlight form momentarily
      const formCard = document.querySelector('.commission-form-card');
      if (formCard) {
        formCard.style.boxShadow = '0 0 35px var(--gold-glow)';
        setTimeout(() => {
          formCard.style.boxShadow = '';
        }, 1200);
      }

      showToast(`Nivel "${tierName}" seleccionado en el formulario.`, 'success', 3000);
    });
  });

  // Handle "Comisionar a [Artista]" clicks in artist profiles
  selectArtistButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const artistName = btn.getAttribute('data-artist');
      if (artistSelect) {
        for (let i = 0; i < artistSelect.options.length; i++) {
          if (artistSelect.options[i].value.includes(artistName)) {
            artistSelect.selectedIndex = i;
            break;
          }
        }
      }

      const formSection = document.getElementById('comisiones');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Artista "${artistName}" preseleccionado para tu proyecto.`, 'success', 3000);
    });
  });

  // Form Validation and Submission
  if (commissionForm) {
    commissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // Inputs to validate
      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const artistInput = document.getElementById('artist-select');
      const typeInput = document.getElementById('commission-type');
      const descInput = document.getElementById('project-description');
      const termsCheck = document.getElementById('terms-agree');

      // Helper function to validate
      function validateField(inputEl, condition) {
        const group = inputEl.closest('.form-group') || inputEl.closest('.form-group-checkbox');
        if (!condition) {
          group.classList.add('has-error');
          hasError = true;
        } else {
          group.classList.remove('has-error');
        }
      }

      // Name validation (> 2 chars)
      validateField(nameInput, nameInput.value.trim().length >= 2);

      // Email validation (regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(emailInput, emailRegex.test(emailInput.value.trim()));

      // Artist selection validation
      validateField(artistInput, artistInput.value !== '');

      // Type selection validation
      validateField(typeInput, typeInput.value !== '');

      // Description validation (> 12 chars)
      validateField(descInput, descInput.value.trim().length >= 12);

      // Terms agreement validation
      validateField(termsCheck, termsCheck.checked);

      if (hasError) {
        showToast('Por favor completa todos los campos requeridos correctamente.', 'error');
        return;
      }

      // Simulated Async Submission
      submitBtn.classList.add('submitting');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('submitting');
        submitBtn.disabled = false;

        // Success Feedback
        showToast('¡Tu solicitud de comisión ha sido enviada con éxito! Nos comunicaremos en 24-48h.', 'success', 6000);

        // Reset form
        commissionForm.reset();

        // Clear error styles
        document.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
      }, 1400);
    });

    // Clear error on input interaction
    commissionForm.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group') || input.closest('.form-group-checkbox');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }

  /* ==========================================================================
     7. WISHLIST BUTTON TOGGLE (Mega RPG System)
     ========================================================================== */
  const wishlistBtn = document.getElementById('wishlist-btn');
  const wishlistBtnText = document.getElementById('wishlist-btn-text');

  if (wishlistBtn) {
    let isWishlisted = false;

    wishlistBtn.addEventListener('click', () => {
      isWishlisted = !isWishlisted;

      if (isWishlisted) {
        wishlistBtnText.textContent = '¡En tu Lista de Deseos!';
        wishlistBtn.style.borderColor = 'var(--crimson-accent)';
        wishlistBtn.style.color = '#ffffff';
        showToast('Mega RPG System añadido a tu lista de seguimiento personal.', 'success');
      } else {
        wishlistBtnText.textContent = 'Seguir en Wishlist (Próx.)';
        wishlistBtn.style.borderColor = '';
        wishlistBtn.style.color = '';
      }
    });
  }

})();
