/* ═══════════════════════════════════════════════════════════════════════════
   Wura — Consentement (EEE, Consent Mode v2) + événement de conversion Google Ads
   Les DÉFAUTS de consentement sont posés en inline dans <head> (avant GTM/gtag).
   Ce fichier gère : la bannière (visiteurs Europe) + le déclenchement conversion.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ⚠️ À REMPLIR : libellé de votre action de conversion Google Ads
  //    (Google Ads → Objectifs → Conversions → votre action → « AW-18453899804/xxxxxxxx »).
  //    Tant qu'il contient « REMPLACER », aucun événement n'est envoyé.
  var CONVERSION_LABEL = 'AW-18453899804/REMPLACER_LIBELLE';

  function gtag() {
    (window.dataLayer = window.dataLayer || []).push(arguments);
  }

  /* ── Conversion : clic sur un CTA d'envoi (tous les CTA mènent au flux invité) ── */
  document.addEventListener(
    'click',
    function (e) {
      var t = e.target;
      var a = t && t.closest ? t.closest('a[href*="app.wura-pay.com/send"]') : null;
      if (!a) return;
      if (CONVERSION_LABEL.indexOf('REMPLACER') !== -1) return; // pas encore configuré
      gtag('event', 'conversion', { send_to: CONVERSION_LABEL });
    },
    true,
  );

  /* ── Bannière de consentement (EEE / UK / CH uniquement) ── */
  var CHOICE = null;
  try {
    CHOICE = localStorage.getItem('wura-consent');
  } catch (e) {}
  if (CHOICE === 'granted' || CHOICE === 'denied') return; // choix déjà fait

  // Ne montrer qu'aux visiteurs probablement dans l'EEE/UK/CH (fuseau Europe/*).
  // Hors Europe : le défaut est « accordé » → pas de friction inutile.
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz && tz.indexOf('Europe/') !== 0) return;
  } catch (e) {
    /* détection impossible → on affiche par sécurité */
  }

  function decide(granted) {
    try {
      localStorage.setItem('wura-consent', granted ? 'granted' : 'denied');
    } catch (e) {}
    if (granted) {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
    var bar = document.getElementById('wura-consent-bar');
    if (bar) bar.parentNode.removeChild(bar);
  }

  function render() {
    if (document.getElementById('wura-consent-bar')) return;
    var css =
      '#wura-consent-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
      'max-width:720px;margin:0 auto;background:rgba(32,29,37,0.98);color:#efedf2;' +
      'border:1px solid rgba(239,237,242,0.14);border-radius:18px;padding:18px 20px;' +
      "font-family:Inter,-apple-system,system-ui,'Segoe UI',sans-serif;" +
      'box-shadow:0 24px 60px -24px rgba(0,0,0,0.7);display:flex;gap:16px;align-items:center;flex-wrap:wrap}' +
      '#wura-consent-bar p{margin:0;flex:1 1 300px;font-size:13.5px;line-height:1.55;color:rgba(239,237,242,0.82)}' +
      '#wura-consent-bar a{color:#bee0d6;text-decoration:underline;text-underline-offset:2px}' +
      '#wura-consent-bar .wcb-actions{display:flex;gap:10px;flex:0 0 auto}' +
      '#wura-consent-bar button{font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;' +
      'padding:10px 18px;border-radius:100px;border:1px solid transparent;transition:opacity .2s,background .2s}' +
      '#wura-consent-bar .wcb-accept{background:#bee0d6;color:#201d25;border-color:#bee0d6}' +
      '#wura-consent-bar .wcb-accept:hover{background:#d7efe6}' +
      '#wura-consent-bar .wcb-refuse{background:transparent;color:#efedf2;border-color:rgba(239,237,242,0.28)}' +
      '#wura-consent-bar .wcb-refuse:hover{border-color:rgba(239,237,242,0.5)}' +
      '@media(max-width:560px){#wura-consent-bar{flex-direction:column;align-items:stretch}' +
      '#wura-consent-bar .wcb-actions{justify-content:stretch}#wura-consent-bar button{flex:1}}';
    var bar = document.createElement('div');
    bar.id = 'wura-consent-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Consentement aux cookies');
    bar.innerHTML =
      '<style>' +
      css +
      '</style>' +
      '<p>Nous utilisons des cookies pour mesurer l’audience et personnaliser nos publicités. ' +
      'Vous pouvez accepter ou refuser. <a href="https://wura-pay.com/confidentialite">En savoir plus</a>.</p>' +
      '<div class="wcb-actions">' +
      '<button type="button" class="wcb-refuse">Refuser</button>' +
      '<button type="button" class="wcb-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.wcb-accept').addEventListener('click', function () {
      decide(true);
    });
    bar.querySelector('.wcb-refuse').addEventListener('click', function () {
      decide(false);
    });
  }

  if (document.readyState !== 'loading') render();
  else document.addEventListener('DOMContentLoaded', render);
})();
