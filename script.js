/* =====================================================
   PORTFOLIO BTS SIO SLAM — script.js
   Sélecteurs et IDs entièrement en français
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initialiserBarreNavig();
  initialiserMenusDeroulants();
  initialiserMenuBurger();
  initialiserApparitions();
  initialiserCompetences();
  initialiserDefilementDoux();
  initialiserLienActif();
});

/* =====================================================
   BARRE DE NAVIGATION — effet au défilement
   ===================================================== */
function initialiserBarreNavig() {
  const barreNavig = document.getElementById('barre-navig');
  if (!barreNavig) return;

  const auDefilement = () => {
    if (window.scrollY > 60) {
      barreNavig.classList.add('defilee');
    } else {
      barreNavig.classList.remove('defilee');
    }
  };

  window.addEventListener('scroll', auDefilement, { passive: true });
  auDefilement();
}

/* =====================================================
   MENUS DÉROULANTS — bureau & mobile
   ===================================================== */
function initialiserMenusDeroulants() {
  const menusDeroulants = document.querySelectorAll('.menu-deroulant');

  menusDeroulants.forEach(md => {
    const bouton = md.querySelector('.bouton-deroulant');
    if (!bouton) return;

    bouton.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const estOuvert = md.classList.contains('ouvert');
        menusDeroulants.forEach(m => m.classList.remove('ouvert'));
        if (!estOuvert) md.classList.add('ouvert');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-deroulant')) {
      menusDeroulants.forEach(m => m.classList.remove('ouvert'));
    }
  });
}

/* =====================================================
   MENU BURGER — mobile
   ===================================================== */
function initialiserMenuBurger() {
  const menuBurger = document.getElementById('menu-burger');
  const menuNavig  = document.getElementById('menu-navig');
  if (!menuBurger || !menuNavig) return;

  menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('ouvert');
    menuNavig.classList.toggle('ouvert');
  });

  menuNavig.querySelectorAll('.lien-navig:not(.bouton-deroulant)').forEach(lien => {
    lien.addEventListener('click', () => {
      menuBurger.classList.remove('ouvert');
      menuNavig.classList.remove('ouvert');
    });
  });
}

/* =====================================================
   ANIMATIONS D'APPARITION AU SCROLL
   ===================================================== */
function initialiserApparitions() {
  const elements = document.querySelectorAll('.apparition');

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting) {
        const fratries = [...entree.target.parentElement.querySelectorAll('.apparition')];
        const index = fratries.indexOf(entree.target);
        const delai = index * 100;

        setTimeout(() => {
          entree.target.classList.add('visible');
        }, delai);

        observateur.unobserve(entree.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observateur.observe(el));
}

/* =====================================================
   COMPÉTENCES — barres de langue & étoiles
   ===================================================== */
function initialiserCompetences() {
  /* Barres de langues */
  const barresLangue = document.querySelectorAll('.remplissage-langue');

  const observateurLangue = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        const barre = entree.target;
        const largeurCible = barre.getAttribute('data-largeur');
        setTimeout(() => {
          barre.style.width = largeurCible + '%';
        }, 300);
        observateurLangue.unobserve(barre);
      }
    });
  }, { threshold: 0.5 });

  barresLangue.forEach(barre => observateurLangue.observe(barre));

  /* Étoiles de compétences */
  const contenteursEtoiles = document.querySelectorAll('.etoiles');

  contenteursEtoiles.forEach(conteneur => {
    const maxEtoiles  = 5;
    const nbRemplies  = parseInt(conteneur.getAttribute('data-etoiles'), 10);

    for (let i = 1; i <= maxEtoiles; i++) {
      const etoile = document.createElement('span');
      etoile.classList.add('etoile');
      if (i <= nbRemplies) etoile.classList.add('remplie');
      etoile.innerHTML = '★';
      conteneur.appendChild(etoile);
    }
  });
}

/* =====================================================
   DÉFILEMENT DOUX — ancres internes
   ===================================================== */
function initialiserDefilementDoux() {
  document.querySelectorAll('a[href^="#"]').forEach(lien => {
    lien.addEventListener('click', (e) => {
      const cible = lien.getAttribute('href');
      if (cible === '#') return;

      const elementCible = document.querySelector(cible);
      if (elementCible) {
        e.preventDefault();
        const barreNavig = document.getElementById('barre-navig');
        const hauteurBarre = barreNavig ? barreNavig.offsetHeight : 68;
        const positionHaut = elementCible.getBoundingClientRect().top + window.scrollY - hauteurBarre;

        window.scrollTo({ top: positionHaut, behavior: 'smooth' });
      }
    });
  });
}

/* =====================================================
   LIEN ACTIF — mise en surbrillance selon la section
   ===================================================== */
function initialiserLienActif() {
  const sections  = document.querySelectorAll('section[id]');
  const liensNavig = document.querySelectorAll('.lien-navig:not(.bouton-deroulant)');

  const mettreAJourActif = () => {
    const positionDefilement = window.scrollY + 100;

    sections.forEach(section => {
      const haut   = section.offsetTop;
      const bas    = haut + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (positionDefilement >= haut && positionDefilement < bas) {
        liensNavig.forEach(lien => {
          lien.classList.remove('actif');
          if (lien.getAttribute('href') === `#${id}`) {
            lien.classList.add('actif');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', mettreAJourActif, { passive: true });
  mettreAJourActif();
}
