# Mythoria — Arena (Partie 2)

> Every Card Tells a Legend

Arène de combat stratégique en local : le joueur affronte une IA simple avec les cartes de son Grimoire et le deck créé dans **My Deck**. Pas de multijoueur en ligne.

## Installation

Aucune dépendance à installer (Tailwind CSS est chargé par CDN). Les modules ES6 et `fetch()` exigent un **serveur local** — ouvrir `arena.html` par double-clic ne fonctionne pas.

```bash
# Option 1 : VS Code → extension « Live Server » → clic droit sur arena.html → Open with Live Server
# Option 2 : Python
python -m http.server 5500
# Option 3 : Node
npx serve .
```

Puis ouvrir `https://mythoria-neon.vercel.app/`.

## Structure

```
mythoria-partie2/

├── js/
│   ├── main.js         point d'entrée, clics du joueur, enchaînement des tours
│   ├── state.js        état du jeu + LocalStorage (addItem, loadItems, saveItems)
│   ├── ui.js           affichage (renderList, clearForm, renderArena…)
│   ├── utils.js        CONFIG, generateId, formatDate, shuffle…
│   ├── cards.js        deck, main, pioche, invocation
│   ├── combat.js       attaques, dégâts, PV, pénalité de camp
│   ├── turns.js        lancer de pièce, tours, victoire
│   └── opponent.js     IA de l'adversaire
└── README.md
```

Le code est en **modules ES6** (`export` / `import`) : `arena.html` charge uniquement `<script type="module" src="js/main.js">`.

## Règles du jeu

1. **Pièce virtuelle** : un tirage aléatoire désigne qui joue en premier.
2. **Camp** : le premier joueur choisit Lumière ou Ténèbres ; l'adversaire reçoit l'autre camp.
3. **Départ** : 3000 PV chacun, 5 cartes en main (jamais plus de 5), 10 emplacements de combat chacun.
4. **Tour** : pioche (si main < 5 et deck non vide) → invocation d'**une** créature → attaques ou défense → fin du tour. L'IA joue ensuite automatiquement.
5. **Pénalité de camp** : une créature du camp opposé au vôtre subit **-20 %** d'attaque et de PV. Seules les statistiques effectives du combat changent, les valeurs de la carte (Grimoire, `cards.json`) restent intactes. Les valeurs pénalisées s'affichent en rouge.
6. **Attaque** : chaque créature attaque **une fois par tour**. Les dégâts égalent l'attaque de l'assaillant et il n'y a pas de riposte. À 0 PV, la créature quitte le champ de bataille.
7. **Défense** : une créature qui défend ne peut plus attaquer ce tour, mais subit moitié moins de dégâts jusqu'au début de votre prochain tour.
8. **Attaque directe** : possible seulement si l'adversaire n'a plus aucune créature.
9. **Fin** : la partie s'arrête quand un joueur tombe à 0 PV. Si les deux camps n'ont plus aucune carte à jouer, le plus de PV gagne.

Actions bloquées : jouer une carte absente de la main, attaquer avec une créature épuisée, invoquer deux fois dans un tour, agir hors de son tour ou après la fin du combat.

## Comment jouer

- Cliquer une carte de la **main** pour l'invoquer.
- Cliquer une de **vos créatures** pour la sélectionner, puis une créature adverse pour attaquer (ou la zone de l'adversaire en haut pour une attaque directe).
- **Défendre** protège la créature sélectionnée. **Fin du tour** passe la main à l'IA.
- Le panneau **Historique** résume les actions (sauvegardé dans `mythoria_arena_log`).

## Données

- **Deck du joueur** : lu dans le LocalStorage sous la clé `mythoria_deck` (liste de cartes ou d'identifiants). Sans deck sauvegardé, un deck aléatoire est utilisé.
- **Deck de l'adversaire** : 20 cartes aléatoires de `data/cards.json`.
- **Format d'une carte** : `id`, `name`, `faction` (`Lumière` / `Ténèbres`), `rarity`, `attack`, `hp`, `image`. Les noms `atk`, `pv`, `camp`, `img` sont aussi acceptés (voir `normalizeCard()` dans `utils.js`).
- **Images** : placées dans `img/`. Pour utiliser `assets/images/`, modifier `CONFIG.IMG_DIR` dans `js/utils.js`.

## Déploiement

Site statique : dépôt GitHub relié à Vercel (aucune commande de build).
