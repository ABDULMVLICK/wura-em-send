# Wura — Landing d'envoi (send.wura-pay.com)

Page marketing dédiée : **envoi d'argent Afrique → Europe par Mobile Money**.
Lien à partager pour commercialiser la version web avant la mise en ligne sur les stores.

Site statique, zéro build : `index.html` + `styles.css` + `app.js` + `brand/`.
Charte reprise du design system de la landing principale (or #d4a017, Space Grotesk + Inter,
dark/light, GSAP + Lenis). Bilingue FR/EN. CTA → `https://app.wura-pay.com/send`.

## Aperçu local

```bash
python3 -m http.server 4599
# → http://localhost:4599
```

## Déploiement Vercel (sous-domaine send.wura-pay.com)

1. Créer le dépôt GitHub et pousser :
   ```bash
   gh repo create wura-em-send --public --source=. --remote=origin --push
   ```
2. Sur Vercel : **Add New → Project** → importer `wura-em-send`.
   - Framework preset : **Other** (site statique, aucun build).
   - Build command : vide. Output directory : `.` (racine).
3. Project → **Settings → Domains** → ajouter `send.wura-pay.com`.
4. Chez le registrar du domaine `wura-pay.com`, ajouter l'enregistrement DNS indiqué par Vercel
   (généralement `CNAME send → cname.vercel-dns.com`).

Les envois auto-déploient ensuite à chaque `git push` (comme les autres sites Wura).

## Contenu éditable

- Textes FR/EN : dictionnaire `I18N` + `FAQ` dans `app.js`.
- Pays d'envoi / devises de réception : tableaux `FROM` / `TO` dans `app.js`.
- Partenaires : tableau `PARTNERS` dans `app.js`.
- Taux d'estimation : `XOF_PER_EUR` (peg fixe 655.957) dans `app.js`.

## Règles de marque (à respecter)

- Aucun chiffre exact de frais Wura (uniquement « bas », « frais de service en sus »).
- Wura n'est pas une banque (disclaimer présent dans le footer).
- Vouvoiement partout. Aucun emoji comme icône (SVG Lucide inline ; les drapeaux pays sont
  des emojis de données, pas des icônes d'interface).
