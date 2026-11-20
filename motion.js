/* WURA send — Mouvement (v6, 20/11/2026), même grammaire que wura-pay.com.
   Chargé APRÈS l'affichage (événement load) : GSAP, ScrollTrigger, SplitText et Lenis sont
   servis depuis /vendor (aucun CDN tiers). Jamais chargé si « réduire les animations ».
   Tout ce qui est déjà visible le reste ; seuls les blocs pas encore apparus sont animés.
   Bilingue : l'i18n remplace le texte des titres (textContent) — un titre découpé redevient
   simplement du texte visible, sans casse. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const load = (src) =>
    new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });

  const start = () =>
    load('/vendor/gsap.min.js')
      .then(() => Promise.all([load('/vendor/ScrollTrigger.min.js'), load('/vendor/SplitText.min.js'), load('/vendor/lenis.min.js')]))
      .then(run)
      .catch(() => {});

  if (document.readyState === 'complete') setTimeout(start, 150);
  else window.addEventListener('load', () => setTimeout(start, 150), { once: true });

  function run() {
    const { gsap, ScrollTrigger, SplitText, Lenis } = window;
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const fine = window.matchMedia('(pointer: fine)').matches;
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
    const shown = (el) => el.classList.contains('in');
    const CLEAR = 'transform,opacity,filter';

    /* Défilement fluide (souris / trackpad ; tactile = natif). */
    if (fine && Lenis) {
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* Barre de progression de lecture. */
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    /* En-têtes de section : sur-titre, titre mot par mot (flou → net), chapeau. */
    $$('.section-head.reveal, .final-cta-inner.reveal').forEach((head) => {
      if (shown(head)) return;
      head.classList.remove('reveal');
      const h2 = head.querySelector('h2');
      const others = $$(':scope > :not(h2)', head);
      const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 86%', once: true } });
      if (others.length) tl.from(others, { y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, clearProps: CLEAR }, 0);
      if (h2 && SplitText) {
        const split = SplitText.create(h2, { type: 'words', wordsClass: 'w' });
        tl.from(split.words, { yPercent: 70, opacity: 0, filter: 'blur(10px)', rotate: 3, duration: 1.05, ease: 'expo.out', stagger: 0.05, clearProps: CLEAR }, 0.05);
      }
    });

    /* Cartes en « autocollants » : elles se collent en léger désordre, par groupe. */
    ['.step-card', '.adv-card', '.coverage-card'].forEach((sel) => {
      const byParent = new Map();
      $$(sel).forEach((el) => {
        const p = el.parentElement;
        if (!byParent.has(p)) byParent.set(p, []);
        byParent.get(p).push(el);
      });
      byParent.forEach((items, parent) => {
        if (items.some(shown)) return;
        items.forEach((i) => i.classList.remove('reveal'));
        gsap.from(items, {
          y: 56,
          scale: 0.9,
          rotate: (i) => (i % 2 ? 4 : -4),
          opacity: 0,
          duration: 0.95,
          ease: 'back.out(1.7)',
          stagger: 0.09,
          scrollTrigger: { trigger: parent, start: 'top 84%', once: true },
          clearProps: CLEAR,
        });
      });
    });

    /* Taux : la carte et l'encadré arrivent de part et d'autre. */
    [['.rate-card', -70], ['.rate-aside', 70], ['.card-copy', -50]].forEach(([sel, x]) => {
      $$(sel).forEach((el) => {
        if (shown(el) || !el.classList.contains('reveal')) return;
        el.classList.remove('reveal');
        gsap.from(el, { x, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true }, clearProps: CLEAR });
      });
    });

    /* Carte Visa : arrive en tournoyant, puis suit la souris. */
    const wrap = document.querySelector('.vcard-wrap');
    if (wrap) {
      if (!shown(wrap)) {
        wrap.classList.remove('reveal');
        gsap.fromTo(
          wrap,
          { y: 120, rotate: -12, scale: 0.86, opacity: 0 },
          { y: 0, rotate: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 98%', end: 'top 45%', scrub: 0.7 } }
        );
      }
      const card = wrap.querySelector('.vcard');
      if (card && fine) {
        gsap.set(card, { transformPerspective: 900 });
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
        wrap.addEventListener('pointermove', (e) => {
          const r = wrap.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 22);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
        });
        wrap.addEventListener('pointerleave', () => {
          rx(0);
          ry(0);
        });
      }
    }

    /* Paiement fournisseur : compteur, lignes, tampon « Approuvé ». */
    $$('.biz-mock').forEach((mock) => {
      if (shown(mock)) return;
      mock.classList.remove('reveal');
      const amt = mock.querySelector('.biz-mock-amount [data-i18n]');
      const tl = gsap.timeline({ scrollTrigger: { trigger: mock, start: 'top 82%', once: true } });
      tl.from(mock, { y: 70, rotate: -5, opacity: 0, duration: 1, ease: 'expo.out', clearProps: CLEAR });
      if (amt) {
        const original = amt.textContent;
        const langAtStart = document.documentElement.lang;
        const target = Number(original.replace(/[^\d,.]/g, '').replace(/[.,](\d{2})$/, '#$1').replace(/[.,\s]/g, '').replace('#', '.'));
        if (target > 0) {
          const loc = langAtStart === 'en' ? 'en-US' : 'fr-FR';
          const fmt = new Intl.NumberFormat(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: target,
              duration: 1.4,
              ease: 'power3.out',
              onUpdate: () => {
                if (document.documentElement.lang !== langAtStart) return;
                amt.textContent = langAtStart === 'en' ? `€${fmt.format(o.v)}` : `${fmt.format(o.v)} €`;
              },
              onComplete: () => {
                if (document.documentElement.lang === langAtStart) amt.textContent = original;
              },
            },
            0.2
          );
        }
      }
      tl.from($$('.biz-mock-rows li', mock), { x: 26, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12, clearProps: CLEAR }, 0.45);
      const pill = mock.querySelector('.biz-pill');
      if (pill) tl.from(pill, { scale: 2.4, rotate: -22, opacity: 0, duration: 0.7, ease: 'back.out(2.6)', clearProps: CLEAR }, 1.1);
    });

    /* Bas de page : les badges des stores sautent en place. */
    $$('.app-badges').forEach((b) => {
      gsap.from(b.children, { y: 40, scale: 0.85, opacity: 0, duration: 0.9, ease: 'back.out(1.8)', stagger: 0.12, scrollTrigger: { trigger: b, start: 'top 90%', once: true }, clearProps: CLEAR });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 800);
  }
})();
