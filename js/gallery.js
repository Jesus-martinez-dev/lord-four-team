/**
 * FORDS FOUR TEAM - INTERACTIVE GALLERY & LIGHTBOX ENGINE
 * Features:
 *  1. Structured artwork repository (JSON/Arrays) for Fcasanova, CC Salas & Stryartstone
 *  2. Artist & Category dual filtering system with smooth transitions
 *  3. Lightbox modal with keyboard navigation (Esc, Left, Right), metadata display & direct commission link
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. ARTWORK REPOSITORY (Data Array for Easy Editing)
     ========================================================================== */
  const galleryData = [
    {
      id: 'art-01',
      title: 'Catedral de Cenizas y Sol Negro',
      artist: 'Fcasanova',
      category: 'Entornos',
      medium: 'Pintura Digital 4K / Clip Studio & Photoshop',
      date: '2026',
      description: 'Pintura conceptual que retrata los restos de una basílica gótica suspendida sobre un mar de niebla volcánica. Iluminada por la corona dorada de un eclipse solar eterno que baña las agujas de piedra en sombras alargadas.',
      tags: ['Dark Fantasy', 'Gothic Architecture', 'Environment Art', 'Mood Painting'],
      accentColor: '#d4af37',
      // High-end stylized SVG illustration
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g1_sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#07080f"/>
              <stop offset="60%" stop-color="#19132b"/>
              <stop offset="100%" stop-color="#2a1810"/>
            </linearGradient>
            <radialGradient id="g1_sun" cx="50%" cy="40%" r="40%">
              <stop offset="0%" stop-color="#ffd700" stop-opacity="0.9"/>
              <stop offset="25%" stop-color="#d4af37" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" fill="url(#g1_sky)"/>
          <circle cx="300" cy="160" r="140" fill="url(#g1_sun)"/>
          <circle cx="300" cy="160" r="75" fill="#06070a"/>
          <circle cx="300" cy="160" r="76" stroke="#ffd700" stroke-width="2.5" opacity="0.85"/>
          <!-- Mist layers -->
          <ellipse cx="300" cy="380" rx="350" ry="90" fill="#1b172b" opacity="0.6"/>
          <!-- Gothic Spire Silhouettes -->
          <polygon points="120,420 170,220 220,420" fill="#0d0f18"/>
          <polygon points="380,420 430,220 480,420" fill="#0d0f18"/>
          <!-- Center Great Nave -->
          <polygon points="210,420 300,120 390,420" fill="#08090f"/>
          <!-- Arches & Windows -->
          <polygon points="270,420 300,260 330,420" fill="#ffd700" opacity="0.3"/>
          <circle cx="300" cy="240" r="22" stroke="#d4af37" stroke-width="2" fill="none"/>
          <!-- Flying buttresses -->
          <path d="M170 270 Q240 260 270 330" stroke="#08090f" stroke-width="8" fill="none"/>
          <path d="M430 270 Q360 260 330 330" stroke="#08090f" stroke-width="8" fill="none"/>
          <!-- Gold ember specks -->
          <circle cx="210" cy="180" r="2" fill="#ffd700"/>
          <circle cx="390" cy="190" r="1.5" fill="#ffd700"/>
          <circle cx="280" cy="90" r="2.5" fill="#ffd700"/>
        </svg>
      `
    },
    {
      id: 'art-02',
      title: 'Valquiria Exoceleste: Modelo 09',
      artist: 'CC Salas',
      category: 'Personajes',
      medium: 'Concept Art / Escultura 3D & Digital Paint',
      date: '2026',
      description: 'Diseño integral de personaje que amalgama la anatomía gótica con el diseño aeroespacial. La armadura integra circuitos etéreos y una lanza de plasma estabilizado para combates a gravedad cero.',
      tags: ['Character Design', 'Cyber-Gothic', 'Armor Concept', 'Sci-Fi'],
      accentColor: '#00e5ff',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g2_bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#050b14"/>
              <stop offset="60%" stop-color="#0a192f"/>
              <stop offset="100%" stop-color="#1e1035"/>
            </linearGradient>
            <linearGradient id="g2_cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#00e5ff"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" fill="url(#g2_bg)"/>
          <!-- Hexagonal Halo -->
          <polygon points="300,40 370,80 370,160 300,200 230,160 230,80" stroke="url(#g2_cyan)" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Cyber Wings -->
          <path d="M300 180 L480 80 L440 220 L300 260 Z" fill="#0f1f38" stroke="#00e5ff" stroke-width="1.5"/>
          <path d="M300 180 L120 80 L160 220 L300 260 Z" fill="#0f1f38" stroke="#00e5ff" stroke-width="1.5"/>
          <!-- Armor Torso Silhouette -->
          <polygon points="260,180 340,180 320,320 280,320" fill="#0b101d" stroke="#ffffff" stroke-width="1"/>
          <!-- Helmet / Visor with Cyan Slash -->
          <circle cx="300" cy="130" r="32" fill="#0d1424" stroke="#00e5ff" stroke-width="2"/>
          <line x1="280" y1="130" x2="320" y2="130" stroke="#00e5ff" stroke-width="4" stroke-linecap="round"/>
          <!-- Lance of Light -->
          <line x1="390" y1="30" x2="390" y2="400" stroke="#00e5ff" stroke-width="3"/>
          <line x1="390" y1="30" x2="390" y2="400" stroke="#ffffff" stroke-width="1"/>
          <!-- Energy particles -->
          <circle cx="390" cy="180" r="6" fill="#00e5ff" opacity="0.8"/>
        </svg>
      `
    },
    {
      id: 'art-03',
      title: 'Mega RPG: Coliseo de las Sombras',
      artist: 'Stryartstone',
      category: 'Concept Art',
      medium: 'Asset de Producción & Key Visual / Godot Engine',
      date: '2026',
      description: 'Estudio de iluminación y arena para el sistema de combate de Mega RPG System. Muestra la integración de baldosas rúnicas que reaccionan a los pasos del jugador y la presencia de jefes guardianes.',
      tags: ['Mega RPG System', 'Combat Arena', 'Technical Art', 'In-Game Keyframe'],
      accentColor: '#a855f7',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g3_bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#140722"/>
              <stop offset="50%" stop-color="#0a0514"/>
              <stop offset="100%" stop-color="#17122b"/>
            </linearGradient>
            <radialGradient id="g3_rune" cx="50%" cy="70%" r="50%">
              <stop offset="0%" stop-color="#a855f7" stop-opacity="0.8"/>
              <stop offset="60%" stop-color="#7928ca" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" fill="url(#g3_bg)"/>
          <!-- Arena Floor Perspective Ellipse -->
          <ellipse cx="300" cy="320" rx="270" ry="90" fill="#0c0d18" stroke="#a855f7" stroke-width="2"/>
          <ellipse cx="300" cy="320" rx="190" ry="60" fill="url(#g3_rune)"/>
          <!-- Concentric Arcane Circles -->
          <ellipse cx="300" cy="320" rx="110" ry="35" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="8 4"/>
          <!-- Floating Pillars -->
          <polygon points="90,140 120,140 110,320 80,320" fill="#1b1633" stroke="#a855f7" stroke-width="1"/>
          <polygon points="480,140 510,140 520,320 490,320" fill="#1b1633" stroke="#a855f7" stroke-width="1"/>
          <!-- Boss Creature Silhouette in background -->
          <path d="M260 140 Q300 90 340 140 L360 220 L240 220 Z" fill="#08070d"/>
          <!-- Glowing Eyes -->
          <circle cx="288" cy="130" r="3" fill="#ff3366"/>
          <circle cx="312" cy="130" r="3" fill="#ff3366"/>
          <!-- Hero with Drawn Greatsword in Foreground -->
          <polygon points="300,240 295,310 305,310" fill="#ffffff"/>
          <line x1="290" y1="260" x2="310" y2="260" stroke="#ffd700" stroke-width="2"/>
        </svg>
      `
    },
    {
      id: 'art-04',
      title: 'El Señor de los Huesos Marchitos',
      artist: 'Fcasanova',
      category: 'Ilustración',
      medium: 'Ilustración Splash Art / Photoshop 4K',
      date: '2026',
      description: 'Ilustración dark fantasy de alta resolución que retrata a un monarca no-muerto sentado en un trono de marfil fósil y raíces petrificadas, portando una espada de obsidiana viva.',
      tags: ['Splash Art', 'Dark Fantasy', 'Eldritch', 'Character Illustration'],
      accentColor: '#ffd700',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g4_bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0a0b0d"/>
              <stop offset="70%" stop-color="#161922"/>
              <stop offset="100%" stop-color="#0d0e12"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" fill="url(#g4_bg)"/>
          <!-- Massive Throne Back -->
          <polygon points="200,400 240,60 360,60 400,400" fill="#11141c" stroke="#d4af37" stroke-width="1.5"/>
          <!-- Crown Silhouette with Amber Gem -->
          <polygon points="275,100 285,75 300,90 315,75 325,100" fill="#d4af37"/>
          <circle cx="300" cy="85" r="3" fill="#ff3366"/>
          <!-- Skull / Face Mask -->
          <polygon points="285,110 315,110 310,140 290,140" fill="#e2e8f0"/>
          <circle cx="293" cy="122" r="2.5" fill="#00e5ff"/>
          <circle cx="307" cy="122" r="2.5" fill="#00e5ff"/>
          <!-- Robe Folds -->
          <polygon points="230,220 370,220 390,420 210,420" fill="#0a0a0f"/>
          <!-- Greatsword between knees -->
          <line x1="300" y1="160" x2="300" y2="410" stroke="#ffd700" stroke-width="4"/>
          <line x1="300" y1="160" x2="300" y2="410" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="280" y1="200" x2="320" y2="200" stroke="#ffd700" stroke-width="3"/>
        </svg>
      `
    },
    {
      id: 'art-05',
      title: 'Centinela Blindado: Quimera 404',
      artist: 'CC Salas',
      category: 'Concept Art',
      medium: 'Concept Sheet / Clip Studio Paint',
      date: '2026',
      description: 'Hoja de diseño mecánico y conceptual de un bípede de guerra autónomo para facciones insurgentes. Estudio de articulaciones hidráulicas, silueta imponente y distribución de blindaje cerámico.',
      tags: ['Mecha Design', 'Concept Art', 'Hard Surface', 'Indie Game Asset'],
      accentColor: '#00e5ff',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g5_bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#0b1017"/>
              <stop offset="100%" stop-color="#141f2d"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" fill="url(#g5_bg)"/>
          <!-- Grid lines for concept schematic feel -->
          <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(0,229,255,0.08)" stroke-width="1"/>
          <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(0,229,255,0.08)" stroke-width="1"/>
          <line x1="0" y1="300" x2="600" y2="300" stroke="rgba(0,229,255,0.08)" stroke-width="1"/>
          <line x1="150" y1="0" x2="150" y2="420" stroke="rgba(0,229,255,0.08)" stroke-width="1"/>
          <line x1="450" y1="0" x2="450" y2="420" stroke="rgba(0,229,255,0.08)" stroke-width="1"/>
          <!-- Mech Torso -->
          <polygon points="240,120 360,120 380,240 220,240" fill="#1b2535" stroke="#00e5ff" stroke-width="2"/>
          <polygon points="280,140 320,140 330,190 270,190" fill="#0f1622" stroke="#d4af37" stroke-width="1.5"/>
          <!-- Heavy Shoulder Pods -->
          <rect x="180" y="100" width="50" height="70" rx="8" fill="#121b27" stroke="#00e5ff" stroke-width="1.5"/>
          <rect x="370" y="100" width="50" height="70" rx="8" fill="#121b27" stroke="#00e5ff" stroke-width="1.5"/>
          <!-- Reverse Joint Legs -->
          <polyline points="240,240 200,310 240,400" stroke="#00e5ff" stroke-width="5" fill="none" stroke-linecap="round"/>
          <polyline points="360,240 400,310 360,400" stroke="#00e5ff" stroke-width="5" fill="none" stroke-linecap="round"/>
          <circle cx="300" cy="165" r="6" fill="#00e5ff"/>
        </svg>
      `
    },
    {
      id: 'art-06',
      title: 'Mega RPG: Forja de Códices',
      artist: 'Stryartstone',
      category: 'Entornos',
      medium: 'Worldbuilding & Nivel Prototipo / C# & Godot',
      date: '2026',
      description: 'Entorno de juego donde el jugador mejora armas arcanas e interactúa con el herrero del vacío. Desarrollado con shaders volumétricos de brasas y runas grabadas dinámicamente.',
      tags: ['Mega RPG System', 'Level Design', 'Lighting 2.5D', 'Technical Art'],
      accentColor: '#f59e0b',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <radialGradient id="g6_fire" cx="50%" cy="65%" r="45%">
              <stop offset="0%" stop-color="#ff7700" stop-opacity="0.9"/>
              <stop offset="40%" stop-color="#b83d00" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" fill="#0b080d"/>
          <!-- Great Anvil Furnace Glow -->
          <circle cx="300" cy="270" r="160" fill="url(#g6_fire)"/>
          <!-- Stone Archways -->
          <path d="M100 420 L100 120 Q300 40 500 120 L500 420" stroke="#221b28" stroke-width="35" fill="none"/>
          <path d="M100 120 Q300 40 500 120" stroke="#d4af37" stroke-width="2" fill="none"/>
          <!-- Massive Anvil in Center -->
          <polygon points="250,280 350,280 330,340 270,340" fill="#13141a" stroke="#ffd700" stroke-width="2"/>
          <rect x="230" y="270" width="140" height="20" rx="4" fill="#20222e" stroke="#ff7700" stroke-width="1.5"/>
          <!-- Molten Hammer Strike Sparks -->
          <circle cx="290" cy="265" r="3" fill="#ffffff"/>
          <line x1="290" y1="265" x2="260" y2="230" stroke="#ffdd55" stroke-width="2"/>
          <line x1="290" y1="265" x2="330" y2="225" stroke="#ffdd55" stroke-width="2"/>
          <line x1="290" y1="265" x2="300" y2="200" stroke="#ffffff" stroke-width="1.5"/>
        </svg>
      `
    },
    {
      id: 'art-07',
      title: 'Oráculo de la Luna Esmeralda',
      artist: 'Fcasanova',
      category: 'Ilustración',
      medium: 'Pintura Digital Acabada / 300 DPI',
      date: '2026',
      description: 'Una hechicera celestial que canaliza constelaciones mediante hilos de seda estelar. Pintada con un balance sutil entre verdes esmeralda, dorados pálidos y negros profundos.',
      tags: ['Sorceress', 'Celestial', 'High Fantasy', 'Key Visual'],
      accentColor: '#10b981',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <radialGradient id="g7_moon" cx="50%" cy="30%" r="40%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.8"/>
              <stop offset="40%" stop-color="#047857" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" fill="#040b08"/>
          <circle cx="300" cy="140" r="110" fill="url(#g7_moon)"/>
          <circle cx="300" cy="140" r="70" stroke="#10b981" stroke-width="2" fill="none"/>
          <!-- Oracle Silhouette -->
          <circle cx="300" cy="180" r="24" fill="#061f15" stroke="#d4af37" stroke-width="1.5"/>
          <path d="M260 220 Q300 210 340 220 L360 420 L240 420 Z" fill="#05140e"/>
          <!-- Floating Runes -->
          <circle cx="210" cy="160" r="4" fill="#10b981"/>
          <circle cx="390" cy="160" r="4" fill="#10b981"/>
          <circle cx="300" cy="70" r="5" fill="#ffd700"/>
          <line x1="210" y1="160" x2="300" y2="70" stroke="#10b981" stroke-width="1" opacity="0.6"/>
          <line x1="390" y1="160" x2="300" y2="70" stroke="#10b981" stroke-width="1" opacity="0.6"/>
        </svg>
      `
    },
    {
      id: 'art-08',
      title: 'Ronin del Vacío: Cuchilla Carmesí',
      artist: 'CC Salas',
      category: 'Personajes',
      medium: 'Character Lineart & Color / Clip Studio Paint',
      date: '2026',
      description: 'Estudio de pose de acción dinámico para un espadachín ciber-samurái errante. Ataviado con gabardina blindada y katana termal sobrecalentada a 2000°C.',
      tags: ['Character Design', 'Ronin', 'Action Pose', 'Cyberpunk'],
      accentColor: '#ff3366',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g8_blade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ff3366"/>
              <stop offset="100%" stop-color="#ffd700"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" fill="#0c070c"/>
          <!-- Dynamic Slash Arc in Background -->
          <path d="M80 340 Q300 60 520 200" stroke="url(#g8_blade)" stroke-width="12" fill="none" opacity="0.75" stroke-linecap="round"/>
          <path d="M80 340 Q300 60 520 200" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9" stroke-linecap="round"/>
          <!-- Ronin Silhouette in low stance -->
          <circle cx="280" cy="200" r="18" fill="#1b0e1b" stroke="#ff3366" stroke-width="2"/>
          <!-- Hat Rim -->
          <ellipse cx="280" cy="195" rx="40" ry="10" fill="#0d070d" stroke="#ff3366" stroke-width="1"/>
          <!-- Coat Tails in Motion -->
          <path d="M260 220 L210 320 L280 290 Z" fill="#190e1a"/>
          <path d="M290 220 L370 330 L320 280 Z" fill="#190e1a"/>
          <!-- Katana held diagonally -->
          <line x1="220" y1="310" x2="410" y2="130" stroke="url(#g8_blade)" stroke-width="4"/>
          <line x1="220" y1="310" x2="410" y2="130" stroke="#ffffff" stroke-width="1.5"/>
        </svg>
      `
    },
    {
      id: 'art-09',
      title: 'Mega RPG: Bestiario del Abismo',
      artist: 'Stryartstone',
      category: 'Concept Art',
      medium: 'Diseño de Criatura & Rigging / Godot Engine',
      date: '2026',
      description: 'Concepto anatómico y desglose de patrones de ataque para el "Gólem de Cuarzo Hendido", uno de los jefes de mitad de juego del sistema Mega RPG.',
      tags: ['Mega RPG System', 'Creature Design', 'Boss Anatomy', 'Game Art'],
      accentColor: '#00e5ff',
      svgGraphic: `
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" class="gallery-image-svg">
          <defs>
            <linearGradient id="g9_crystal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#00e5ff"/>
              <stop offset="50%" stop-color="#3b82f6"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" fill="#060c16"/>
          <!-- Crystal Shards Orbiting -->
          <polygon points="160,80 180,120 150,140" fill="url(#g9_crystal)"/>
          <polygon points="440,90 460,130 430,150" fill="url(#g9_crystal)"/>
          <polygon points="300,40 320,70 290,80" fill="url(#g9_crystal)"/>
          <!-- Core Monster Body -->
          <polygon points="220,160 380,160 410,320 190,320" fill="#0d1b2a" stroke="#00e5ff" stroke-width="2"/>
          <!-- Glowing Cracks -->
          <polyline points="260,180 290,240 270,300" stroke="#00e5ff" stroke-width="3" fill="none"/>
          <polyline points="340,180 320,230 350,290" stroke="#00e5ff" stroke-width="3" fill="none"/>
          <circle cx="300" cy="220" r="14" fill="#00e5ff" opacity="0.9"/>
          <!-- Massive Stone Fists -->
          <rect x="140" y="270" width="60" height="80" rx="12" fill="#08111c" stroke="#d4af37" stroke-width="1.5"/>
          <rect x="400" y="270" width="60" height="80" rx="12" fill="#08111c" stroke="#d4af37" stroke-width="1.5"/>
        </svg>
      `
    }
  ];

  /* ==========================================================================
     2. GALLERY CONTROLLER STATE & DOM REFERENCES
     ========================================================================== */
  const galleryGrid = document.getElementById('gallery-grid');
  const countBadge = document.getElementById('gallery-count-badge');
  const artistFilterBtns = document.querySelectorAll('#artist-filters .filter-btn');
  const categoryFilterBtns = document.querySelectorAll('#category-filters .filter-btn');

  // Lightbox DOM elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lbVisualContainer = document.getElementById('lightbox-visual-container');
  const lbCategory = document.getElementById('lb-category');
  const lbCounter = document.getElementById('lb-counter');
  const lbTitle = document.getElementById('lb-title');
  const lbArtist = document.getElementById('lb-artist');
  const lbDescription = document.getElementById('lb-description');
  const lbMedium = document.getElementById('lb-medium');
  const lbDate = document.getElementById('lb-date');
  const lbTags = document.getElementById('lb-tags');
  const lbCommissionBtn = document.getElementById('lb-commission-btn');

  let currentArtistFilter = 'all';
  let currentCategoryFilter = 'all';
  let filteredArtworks = [...galleryData];
  let currentLightboxIndex = 0;

  /* ==========================================================================
     3. RENDER GALLERY CARDS
     ========================================================================== */
  function renderGallery() {
    if (!galleryGrid) return;

    // Filter logic
    filteredArtworks = galleryData.filter((item) => {
      const matchArtist = currentArtistFilter === 'all' || item.artist.toLowerCase() === currentArtistFilter.toLowerCase();
      const matchCategory = currentCategoryFilter === 'all' || item.category.toLowerCase() === currentCategoryFilter.toLowerCase();
      return matchArtist && matchCategory;
    });

    // Update count badge
    if (countBadge) {
      countBadge.textContent = `Mostrando ${filteredArtworks.length} Obra${filteredArtworks.length === 1 ? '' : 's'}`;
    }

    // Clear grid
    galleryGrid.innerHTML = '';

    if (filteredArtworks.length === 0) {
      galleryGrid.innerHTML = `
        <div class="empty-gallery glass-card text-center" style="grid-column: 1 / -1; padding: 4rem 2rem;">
          <h3 style="font-family: var(--font-mythic); margin-bottom: 0.5rem; color: var(--gold-bright);">No se encontraron obras</h3>
          <p style="color: var(--text-secondary);">Prueba ajustando los filtros de artista o categoría.</p>
        </div>
      `;
      return;
    }

    // Build DOM elements
    filteredArtworks.forEach((art, index) => {
      const card = document.createElement('article');
      card.className = 'gallery-card glass-card tilt-card reveal-up revealed';
      card.setAttribute('data-cursor', 'Ver Obra');
      card.setAttribute('data-tilt-max', '8');
      card.setAttribute('data-index', index);

      card.innerHTML = `
        <div class="card-spotlight"></div>
        <div class="gallery-image-box">
          ${art.svgGraphic}
          <div class="gallery-overlay">
            <div class="gallery-tag-row">
              <span class="gallery-cat-badge">${art.category}</span>
              <span class="gallery-artist-badge">${art.artist}</span>
            </div>
            <h3 class="gallery-title">${art.title}</h3>
            <span class="gallery-view-prompt">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Haz clic para ampliar detalles
            </span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(index);
      });

      galleryGrid.appendChild(card);
    });

    // Re-bind cursor listeners and 3D tilt on new cards
    if (window.refreshCursorTriggers) {
      window.refreshCursorTriggers();
    }
    if (window.initTiltCards) {
      window.initTiltCards();
    }
  }

  /* ==========================================================================
     4. FILTER CONTROLLER
     ========================================================================== */
  function setupFilters() {
    // Artist filter clicks
    artistFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        artistFilterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentArtistFilter = btn.dataset.filterArtist;
        renderGallery();
      });
    });

    // Category filter clicks
    categoryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        categoryFilterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentCategoryFilter = btn.dataset.filterCategory;
        renderGallery();
      });
    });
  }

  /* ==========================================================================
     5. LIGHTBOX MODAL CONTROLLER
     ========================================================================== */
  function openLightbox(index) {
    if (!filteredArtworks[index]) return;
    currentLightboxIndex = index;
    const art = filteredArtworks[currentLightboxIndex];

    // Populate modal content
    lbVisualContainer.innerHTML = art.svgGraphic;
    lbCategory.textContent = art.category;
    lbCounter.textContent = `${currentLightboxIndex + 1} / ${filteredArtworks.length}`;
    lbTitle.textContent = art.title;
    lbArtist.textContent = art.artist;
    lbDescription.textContent = art.description;
    lbMedium.textContent = art.medium;
    lbDate.textContent = art.date;

    // Tags
    lbTags.innerHTML = '';
    art.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag-pill';
      tagSpan.textContent = tag;
      lbTags.appendChild(tagSpan);
    });

    // Button commission link
    if (lbCommissionBtn) {
      lbCommissionBtn.onclick = () => {
        closeLightbox();
        // Pre-select artist in form
        const artistSelect = document.getElementById('artist-select');
        if (artistSelect) {
          artistSelect.value = art.artist;
        }
        // Scroll smoothly to commission form
        const comSec = document.getElementById('comisiones');
        if (comSec) {
          comSec.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    // Show modal & prevent background scrolling
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Refresh cursor triggers inside modal
    if (window.refreshCursorTriggers) {
      window.refreshCursorTriggers();
    }
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextArtwork() {
    if (filteredArtworks.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredArtworks.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrevArtwork() {
    if (filteredArtworks.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    openLightbox(currentLightboxIndex);
  }

  // Lightbox event listeners
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextArtwork);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevArtwork);

  // Keyboard navigation (Esc, ArrowLeft, ArrowRight)
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextArtwork();
    } else if (e.key === 'ArrowLeft') {
      showPrevArtwork();
    }
  });

  // Expose API for external scripts
  window.galleryEngine = {
    openLightbox,
    closeLightbox,
    renderGallery,
    getArtworks: () => galleryData
  };

  // Initialize gallery and filters
  setupFilters();
  renderGallery();

})();
