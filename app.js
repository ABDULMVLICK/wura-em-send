/* ═══════════════════════════════════════════════════════════════
   Wura — send.wura-pay.com — interactions
   Vanilla JS. GSAP + ScrollTrigger + Lenis via CDN (globals).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ─────────── i18n ─────────── */
  const I18N = {
    fr: {
      'nav.how': 'Comment ça marche',
      'nav.countries': 'Pays',
      'nav.why': 'Pourquoi Wura',
      'nav.faq': 'Questions',
      'cta.send': 'Envoyer maintenant',
      'marq.label': 'Vous payez depuis',
      'hero.badge': 'Afrique → Europe, par Mobile Money',
      'hero.t1': "Envoyez de l'argent",
      'hero.t2': "d'Afrique vers l'Europe.",
      'hero.t3': 'Payez avec Mobile Money.',
      'hero.sub':
        "Pas besoin de compte bancaire pour envoyer. Vous payez avec votre Mobile Money, votre proche reçoit des euros sur son compte. En quelques minutes.",
      'hero.cta': "Envoyer de l'argent",
      'hero.cta2': 'Voir comment ça marche',
      'hero.trust1': 'Partenaires régulés',
      'hero.trust2': 'En quelques minutes',
      'hero.trust3': 'Sans compte bancaire pour envoyer',
      'how.eyebrow': 'Comment ça marche',
      'how.title': 'Trois étapes, quelques minutes',
      'how.lead': "Vous n'avez besoin que du Mobile Money et de l'e-mail de votre proche.",
      'how.s1.t': 'Vous payez par Mobile Money',
      'how.s1.d':
        'MTN, Moov, Orange, M-Pesa… Vous validez le paiement depuis votre téléphone, comme un transfert Mobile Money habituel.',
      'how.s2.t': 'Wura convertit et livre',
      'how.s2.d':
        "Votre paiement est converti et acheminé automatiquement vers un espace sécurisé au nom de votre bénéficiaire. Aucune manipulation de votre part.",
      'how.s3.t': 'Le bénéficiaire reçoit des euros',
      'how.s3.d':
        "Votre proche ouvre le lien reçu par e-mail et retire les fonds sur son compte bancaire européen. Le virement arrive généralement sous un jour ouvré.",
      'conv.eyebrow': 'Estimation',
      'conv.title': 'Combien votre proche reçoit',
      'conv.youpay': 'Vous envoyez',
      'conv.theyget': 'Le bénéficiaire reçoit environ',
      'conv.indic':
        "Estimation au taux fixe FCFA/euro, frais de service en sus. Le montant net exact s'affiche dans l'application avant de payer.",
      'conv.cta': 'Obtenir le montant exact',
      'co.eyebrow': 'Couverture',
      'co.title': "D'où vous envoyez, où l'on reçoit",
      'co.from.t': 'Vous payez depuis',
      'co.from.d': 'Par Mobile Money ou transfert local, dans ces pays',
      'co.to.t': 'Le bénéficiaire reçoit',
      'co.to.d': "Sur un compte bancaire, dans l'une de ces devises",
      'co.more': 'Retrait bancaire pris en charge dans plus de 160 pays via notre partenaire suisse.',
      'why.eyebrow': 'Pourquoi Wura',
      'why.title': 'Pensé pour la diaspora et leurs proches',
      'why.a1.t': 'Payez avec le Mobile Money',
      'why.a1.d':
        "Aucune carte bancaire, aucun compte bancaire nécessaire pour envoyer. Vous utilisez l'argent déjà sur votre téléphone.",
      'why.a2.t': 'Rapide et simple',
      'why.a2.d':
        "Un envoi se fait en quelques minutes, en quelques écrans. Pas de paperasse, pas d'agence à visiter.",
      'why.a3.t': 'Sécurisé et transparent',
      'why.a3.d':
        'Le montant reçu s\'affiche avant de payer. Les fonds sont acheminés via des partenaires régulés, sans mauvaise surprise.',
      'why.a4.t': 'Frais bas',
      'why.a4.d': 'Un coût réduit et clair sur chaque envoi, pour que le maximum arrive à votre proche.',
      'trust.eyebrow': 'Confiance',
      'trust.title': 'Une infrastructure sérieuse derrière chaque envoi',
      'trust.d':
        "Wura s'appuie sur des partenaires régulés pour la collecte Mobile Money et le versement bancaire en Europe. Vos fonds ne restent jamais bloqués sans issue.",
      'faq.eyebrow': 'Questions fréquentes',
      'faq.title': 'Ce que vous vous demandez',
      'fc.title': 'Prêt à envoyer votre premier transfert ?',
      'fc.sub': 'Cela prend quelques minutes. Vous voyez le montant reçu avant de payer.',
      'fc.cta': 'Envoyer maintenant',
      'foot.tag': "Envoi d'argent d'Afrique vers l'Europe, par Mobile Money.",
      'foot.link.send': "Envoyer de l'argent",
      'foot.link.site': 'Site principal',
      'foot.disclaimer':
        "Wura n'est pas une banque. Les services de paiement et de versement sont fournis via des partenaires régulés. Les montants et délais sont indicatifs et confirmés dans l'application avant chaque envoi.",
      'foot.rights': 'Tous droits réservés.',
    },
    en: {
      'nav.how': 'How it works',
      'nav.countries': 'Countries',
      'nav.why': 'Why Wura',
      'nav.faq': 'FAQ',
      'cta.send': 'Send now',
      'marq.label': 'You pay from',
      'hero.badge': 'Africa → Europe, with Mobile Money',
      'hero.t1': 'Send money',
      'hero.t2': 'from Africa to Europe.',
      'hero.t3': 'Pay with Mobile Money.',
      'hero.sub':
        'No bank account needed to send. You pay with your Mobile Money, your loved one receives euros in their bank account. In minutes.',
      'hero.cta': 'Send money',
      'hero.cta2': 'See how it works',
      'hero.trust1': 'Regulated partners',
      'hero.trust2': 'In minutes',
      'hero.trust3': 'No bank account to send',
      'how.eyebrow': 'How it works',
      'how.title': 'Three steps, a few minutes',
      'how.lead': "You only need Mobile Money and your recipient's email.",
      'how.s1.t': 'You pay with Mobile Money',
      'how.s1.d':
        'MTN, Moov, Orange, M-Pesa… You approve the payment from your phone, just like a regular Mobile Money transfer.',
      'how.s2.t': 'Wura converts and delivers',
      'how.s2.d':
        'Your payment is converted and routed automatically to a secure space in your recipient’s name. Nothing to handle on your side.',
      'how.s3.t': 'Your recipient receives euros',
      'how.s3.d':
        'Your loved one opens the link received by email and withdraws the funds to their European bank account. The transfer usually arrives within one business day.',
      'conv.eyebrow': 'Estimate',
      'conv.title': 'How much your recipient gets',
      'conv.youpay': 'You send',
      'conv.theyget': 'Recipient gets about',
      'conv.indic':
        'Estimate at the fixed CFA/euro rate, service fee on top. The exact net amount is shown in the app before you pay.',
      'conv.cta': 'Get the exact amount',
      'co.eyebrow': 'Coverage',
      'co.title': 'Where you send from, where they receive',
      'co.from.t': 'You pay from',
      'co.from.d': 'By Mobile Money or local transfer, in these countries',
      'co.to.t': 'Your recipient receives',
      'co.to.d': 'To a bank account, in one of these currencies',
      'co.more': 'Bank withdrawal supported in 160+ countries via our Swiss partner.',
      'why.eyebrow': 'Why Wura',
      'why.title': 'Built for the diaspora and their families',
      'why.a1.t': 'Pay with Mobile Money',
      'why.a1.d':
        'No bank card, no bank account needed to send. You use the money already on your phone.',
      'why.a2.t': 'Fast and simple',
      'why.a2.d': 'A transfer takes a few minutes, a few screens. No paperwork, no branch to visit.',
      'why.a3.t': 'Secure and transparent',
      'why.a3.d':
        'The amount received is shown before you pay. Funds are routed via regulated partners, with no bad surprises.',
      'why.a4.t': 'Low fees',
      'why.a4.d': 'A low, clear cost on every transfer, so the most reaches your loved one.',
      'trust.eyebrow': 'Trust',
      'trust.title': 'Serious infrastructure behind every transfer',
      'trust.d':
        'Wura relies on regulated partners for Mobile Money collection and bank payout in Europe. Your funds are never left stuck with no way out.',
      'faq.eyebrow': 'Frequently asked',
      'faq.title': 'What you are wondering',
      'fc.title': 'Ready to send your first transfer?',
      'fc.sub': 'It takes a few minutes. You see the received amount before you pay.',
      'fc.cta': 'Send now',
      'foot.tag': 'Send money from Africa to Europe, with Mobile Money.',
      'foot.link.send': 'Send money',
      'foot.link.site': 'Main site',
      'foot.disclaimer':
        'Wura is not a bank. Payment and payout services are provided via regulated partners. Amounts and timings are indicative and confirmed in the app before each transfer.',
      'foot.rights': 'All rights reserved.',
    },
  };

  const FAQ = {
    fr: [
      ['Ai-je besoin d’un compte bancaire pour envoyer ?', 'Non. Vous payez avec votre Mobile Money. Aucun compte ni carte bancaire n’est nécessaire côté expéditeur.'],
      ['Comment mon proche reçoit-il l’argent ?', 'Il reçoit un lien par e-mail, l’ouvre, et retire les fonds sur son compte bancaire en euros. Le virement arrive généralement sous un jour ouvré.'],
      ['Combien de temps prend un envoi ?', 'L’envoi lui-même se fait en quelques minutes. Le versement bancaire au bénéficiaire arrive habituellement sous un jour ouvré.'],
      ['Quels sont les frais ?', 'Les frais sont bas et affichés clairement : vous voyez le montant exact que votre proche recevra avant de valider le paiement.'],
      ['Est-ce sécurisé ?', 'Oui. La collecte Mobile Money et le versement bancaire passent par des partenaires régulés. Wura n’est pas une banque mais s’appuie sur une infrastructure sérieuse.'],
      ['De quoi ai-je besoin pour commencer ?', 'De votre numéro Mobile Money et de l’adresse e-mail de votre bénéficiaire. C’est tout.'],
    ],
    en: [
      ['Do I need a bank account to send?', 'No. You pay with your Mobile Money. No bank account or card is needed on the sender side.'],
      ['How does my recipient get the money?', 'They receive a link by email, open it, and withdraw the funds to their bank account in euros. The transfer usually arrives within one business day.'],
      ['How long does a transfer take?', 'The send itself takes a few minutes. The bank payout to the recipient usually arrives within one business day.'],
      ['What are the fees?', 'Fees are low and shown clearly: you see the exact amount your recipient will get before you approve the payment.'],
      ['Is it secure?', 'Yes. Mobile Money collection and bank payout go through regulated partners. Wura is not a bank but relies on serious infrastructure.'],
      ['What do I need to get started?', 'Your Mobile Money number and your recipient’s email address. That’s it.'],
    ],
  };

  // Pays d'envoi (Fonbnk on-ramp, focus Afrique)
  const FROM = [
    ['🇧🇯', { fr: 'Bénin', en: 'Benin' }, 'Mobile Money'],
    ['🇸🇳', { fr: 'Sénégal', en: 'Senegal' }, 'Mobile Money'],
    ['🇨🇮', { fr: "Côte d'Ivoire", en: 'Ivory Coast' }, 'Mobile Money'],
    ['🇧🇫', { fr: 'Burkina Faso', en: 'Burkina Faso' }, 'Mobile Money'],
    ['🇳🇬', { fr: 'Nigeria', en: 'Nigeria' }, 'Bank transfer'],
    ['🇰🇪', { fr: 'Kenya', en: 'Kenya' }, 'M-Pesa'],
    ['🇬🇭', { fr: 'Ghana', en: 'Ghana' }, 'Mobile Money'],
    ['🇨🇲', { fr: 'Cameroun', en: 'Cameroon' }, 'Mobile Money'],
    ['🇹🇿', { fr: 'Tanzanie', en: 'Tanzania' }, 'Mobile Money'],
    ['🇺🇬', { fr: 'Ouganda', en: 'Uganda' }, 'Mobile Money'],
    ['🇿🇲', { fr: 'Zambie', en: 'Zambia' }, 'Mobile Money'],
    ['🇬🇦', { fr: 'Gabon', en: 'Gabon' }, 'Mobile Money'],
    ['🇨🇬', { fr: 'Congo', en: 'Congo' }, 'Mobile Money'],
    ['🇨🇩', { fr: 'RD Congo', en: 'DR Congo' }, 'Mobile Money'],
    ['🇬🇲', { fr: 'Gambie', en: 'Gambia' }, 'Mobile Money'],
    ['🇱🇷', { fr: 'Liberia', en: 'Liberia' }, 'Mobile Money'],
    ['🇿🇦', { fr: 'Afrique du Sud', en: 'South Africa' }, 'Bank transfer'],
  ];

  // Devises de réception (Mt Pelerin off-ramp) — Europe d'abord
  const TO = [
    ['🇪🇺', 'EUR', { fr: 'Euro', en: 'Euro' }],
    ['🇬🇧', 'GBP', { fr: 'Livre sterling', en: 'Pound' }],
    ['🇨🇭', 'CHF', { fr: 'Franc suisse', en: 'Swiss franc' }],
    ['🇺🇸', 'USD', { fr: 'Dollar US', en: 'US dollar' }],
    ['🇨🇦', 'CAD', { fr: 'Dollar canadien', en: 'Canadian dollar' }],
    ['🇸🇪', 'SEK', { fr: 'Couronne suédoise', en: 'Swedish krona' }],
    ['🇳🇴', 'NOK', { fr: 'Couronne norvégienne', en: 'Norwegian krone' }],
    ['🇩🇰', 'DKK', { fr: 'Couronne danoise', en: 'Danish krone' }],
    ['🇵🇱', 'PLN', { fr: 'Zloty polonais', en: 'Polish zloty' }],
    ['🇨🇿', 'CZK', { fr: 'Couronne tchèque', en: 'Czech koruna' }],
    ['🇦🇺', 'AUD', { fr: 'Dollar australien', en: 'Australian dollar' }],
    ['🇯🇵', 'JPY', { fr: 'Yen', en: 'Yen' }],
    ['🇸🇬', 'SGD', { fr: 'Dollar de Singapour', en: 'Singapore dollar' }],
  ];

  let lang = root.getAttribute('lang') === 'en' ? 'en' : 'fr';

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.fr[key] || key);
  }

  function renderChips() {
    const from = $('#fromCountries');
    const to = $('#toCurrencies');
    if (from) {
      from.innerHTML = FROM.map(
        (c) =>
          `<li class="chip"><span class="flag" aria-hidden="true">${c[0]}</span>${c[1][lang]}</li>`
      ).join('');
    }
    if (to) {
      to.innerHTML = TO.map(
        (c) =>
          `<li class="chip"><span class="flag" aria-hidden="true">${c[0]}</span>${c[2][lang]}<span class="cur">${c[1]}</span></li>`
      ).join('');
    }
  }

  function renderFaq() {
    const list = $('#faq-list');
    if (!list) return;
    list.innerHTML = FAQ[lang]
      .map(
        (qa) => `
      <details class="faq-item">
        <summary class="faq-q">${qa[0]}
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <div class="faq-a">${qa[1]}</div>
      </details>`
      )
      .join('');
  }

  // Marquee de pays d'envoi (façon kreativa) : la piste est dupliquée pour une boucle continue.
  function renderMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;
    const item = (c) =>
      `<span class="marquee-item"><span class="flag" aria-hidden="true">${c[0]}</span>${c[1][lang]}</span>`;
    const seq = FROM.map(item).join('');
    track.innerHTML = seq + seq; // ×2 → translateX(-50%) boucle sans couture
  }

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'fr';
    root.setAttribute('lang', lang);
    try {
      localStorage.setItem('wura-lang', lang);
    } catch (e) {}
    $$('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      const v = t(k);
      if (v) el.textContent = v;
    });
    $$('.lang-btn').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang))
    );
    renderChips();
    renderFaq();
    renderPartners();
    renderMarquee();
    styleHeroLines();
    updateConverter();
  }

  // Découpe chaque ligne du titre hero en une ligne masquée + un inner translatable, pour le
  // reveal « mask » façon kreativa (SplitText). Rejoué après chaque changement de langue (l'i18n
  // remet le textContent, donc on ré-enveloppe).
  function styleHeroLines() {
    $$('.hero-title .word').forEach((w) => {
      const txt = w.textContent;
      w.classList.add('line');
      w.innerHTML = `<span class="line-inner">${txt}</span>`;
    });
  }
  function animateHeroIntro() {
    if (reduced || typeof window.gsap === 'undefined') return;
    window.gsap.set('.hero-title .line-inner', { yPercent: 118 });
    window.gsap.to('.hero-title .line-inner', {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.1,
      delay: 0.15,
    });
  }

  $$('.lang-btn').forEach((b) =>
    b.addEventListener('click', () => applyLang(b.getAttribute('data-lang')))
  );

  /* ─────────── Header scroll ─────────── */
  const header = $('#header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─────────── Convertisseur (peg fixe FCFA/EUR = 655.957) ─────────── */
  const XOF_PER_EUR = 655.957; // parité fixe officielle du franc CFA
  const convFrom = $('#convFrom');
  const convTo = $('#convTo');

  function parseNum(s) {
    return parseFloat(String(s).replace(/[^\d]/g, '')) || 0;
  }
  function fmtXof(n) {
    return n.toLocaleString(lang === 'en' ? 'en-US' : 'fr-FR');
  }
  function fmtEur(n) {
    return n.toLocaleString(lang === 'en' ? 'en-US' : 'fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  function updateConverter() {
    if (!convFrom || !convTo) return;
    const xof = parseNum(convFrom.value);
    const eur = xof / XOF_PER_EUR;
    convTo.value = xof > 0 ? '≈ ' + fmtEur(eur) : '—';
  }
  if (convFrom) {
    convFrom.addEventListener('input', () => {
      const caretEnd = convFrom.selectionStart === convFrom.value.length;
      const n = parseNum(convFrom.value);
      convFrom.value = n > 0 ? fmtXof(n) : '';
      if (caretEnd) {
        try {
          convFrom.setSelectionRange(convFrom.value.length, convFrom.value.length);
        } catch (e) {}
      }
      updateConverter();
    });
  }

  /* ─────────── Partners (fonction hissée : appelée par applyLang) ─────────── */
  const PARTNERS = [
    ['Fonbnk', { fr: 'Collecte Mobile Money', en: 'Mobile Money collection' }],
    ['Mt Pelerin', { fr: 'Versement bancaire (Suisse)', en: 'Bank payout (Switzerland)' }],
    ['Privy', { fr: 'Portefeuilles sécurisés', en: 'Secure wallets' }],
  ];
  function renderPartners() {
    const partners = $('#partners');
    if (!partners) return;
    const shield =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';
    partners.innerHTML = PARTNERS.map(
      (p) => `<span class="partner">${shield}<span>${p[0]}<small>${p[1][lang]}</small></span></span>`
    ).join('');
  }

  /* ─────────── Reveal (GSAP si dispo, sinon IO) ─────────── */
  function initReveal() {
    const els = $$('.reveal');
    if (reduced) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onStart: () => el.classList.add('in'),
          }
        );
      });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );
      els.forEach((el) => io.observe(el));
    }
  }

  /* ─────────── Lenis smooth scroll ─────────── */
  function initLenis() {
    if (reduced || typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
          }
        }
      });
    });
  }

  /* ─────────── Cursor glow + magnetic + ripple ─────────── */
  function initPointer() {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const glow = $('.cursor-glow');
    let gx = window.innerWidth / 2,
      gy = window.innerHeight / 2,
      cx = gx,
      cy = gy;
    window.addEventListener('mousemove', (e) => {
      gx = e.clientX;
      gy = e.clientY;
      if (glow) glow.style.opacity = '1';
    });
    (function loop() {
      cx += (gx - cx) * 0.18;
      cy += (gy - cy) * 0.18;
      if (glow) glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    // Anneau qui grossit au survol des éléments interactifs (façon curseur kreativa).
    $$('a, button, .faq-q, [data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', () => glow && glow.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => glow && glow.classList.remove('is-hover'));
    });

    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => (el.style.transform = ''));
    });
  }
  $$('[data-ripple]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const r = el.getBoundingClientRect();
      const span = document.createElement('span');
      span.className = 'ripple';
      const size = Math.max(r.width, r.height);
      span.style.width = span.style.height = size + 'px';
      span.style.left = e.clientX - r.left - size / 2 + 'px';
      span.style.top = e.clientY - r.top - size / 2 + 'px';
      el.appendChild(span);
      setTimeout(() => span.remove(), 600);
    });
  });

  /* ─────────── Hero canvas — lignes dorées à la dérive ─────────── */
  function initHeroCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, lines;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function build() {
      const n = Math.max(9, Math.min(18, Math.round(w / 90)));
      lines = [];
      for (let i = 0; i < n; i++) {
        lines.push({
          y: (h / n) * i + Math.random() * 40,
          amp: 18 + Math.random() * 46,
          len: 0.4 + Math.random() * 0.5,
          speed: 0.0004 + Math.random() * 0.0009,
          phase: Math.random() * Math.PI * 2,
          width: 0.6 + Math.random() * 1.1,
        });
      }
    }
    let running = true;
    function draw(ts) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const alpha = 0.22; // mint subtil sur fond charbon
      lines.forEach((ln) => {
        ctx.beginPath();
        const startX = w * (0.5 - ln.len / 2);
        const endX = w * (0.5 + ln.len / 2);
        for (let x = startX; x <= endX; x += 6) {
          const p = (x - startX) / (endX - startX);
          const fade = Math.sin(p * Math.PI); // 0 aux bords, 1 au centre
          const y = ln.y + Math.sin(x * 0.01 + ts * ln.speed + ln.phase) * ln.amp * fade;
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(startX, 0, endX, 0);
        grad.addColorStop(0, 'rgba(190,224,214,0)');
        grad.addColorStop(0.5, `rgba(190,224,214,${alpha})`);
        grad.addColorStop(1, 'rgba(190,224,214,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = ln.width;
        ctx.stroke();
      });
      requestAnimationFrame(draw);
    }
    resize();
    build();
    requestAnimationFrame(draw);
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        resize();
        build();
      }, 200);
    });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });
  }

  /* ─────────── Init ─────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  applyLang(lang); // rend chips + faq + marquee + i18n + converter + découpe titre hero
  updateConverter();
  initReveal();
  animateHeroIntro(); // reveal ligne-par-ligne du titre (après le découpage par applyLang)
  initLenis();
  initPointer();
  initHeroCanvas();
})();
