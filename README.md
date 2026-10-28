# 🔮 Mythoria

> **Every Card Tells a Legend**

Mythoria est un site web de cartes à collectionner dans un univers de fantasy. Le joueur achète des boosters, les ouvre dans une animation interactive, range ses cartes dans un grimoire illustré et compose son deck de combat.

🌐 **Démo en ligne :** [mythoria-neon.vercel.app](https://mythoria-neon.vercel.app/Booster.html)

---

## 📑 Sommaire

1. [Fonctionnalités](#-fonctionnalités)
2. [Technologies](#-technologies)
3. [Structure du projet](#-structure-du-projet)
4. [Modèle de données](#-modèle-de-données)
5. [Règles du jeu](#-règles-du-jeu)
6. [Installation et lancement](#-installation-et-lancement)
7. [Déploiement](#-déploiement)
8. [Planification des tâches](#-planification-des-tâches)
9. [Auteur](#-auteur)

---

## ✨ Fonctionnalités

### 🏠 Home
Page d'accueil présentant l'univers de Mythoria, son slogan et l'accès aux pages principales.

### 🛒 Boutique
- Catalogue de boosters (ex. *Beginner Pack*, *Summoning of the Legends*).
- **Panier fonctionnel** : ajout, suppression, quantités et total.
- Les boosters achetés sont ajoutés à l'inventaire du joueur.

### 📦 Opening Chamber — Ouverture des boosters
Une expérience interactive et visuellement satisfaisante :

1. Le joueur achète un booster dans la boutique.
2. Il accède à la liste de ses boosters disponibles.
3. Il clique sur **« Ouvrir le booster »**.
4. Une animation révèle les cartes une à une.
5. Chaque carte affiche : **illustration, nom, type, rareté et statistiques**.
6. Les cartes obtenues sont **automatiquement ajoutées à la collection**.
7. Un **message spécial** apparaît lorsqu'une carte **rare, épique ou légendaire** est découverte.

**Tirage aléatoire réel :** les cartes sont tirées dynamiquement depuis un catalogue défini en JavaScript. Le type de booster détermine les cartes éligibles et les probabilités d'obtention. Les probabilités sont définies dans les données du jeu et appliquées par une fonction JavaScript : l'animation ne se contente jamais d'afficher des cartes choisies à l'avance.

| Booster | Cartes | Particularité |
|---|---|---|
| Beginner Pack | 5 | Probabilités standard, cartes communes en majorité |
| Summoning of the Legends | 5 | Meilleures chances d'obtenir une carte légendaire |

### 📖 My Grimoire — Ma collection
Le grimoire est l'élément visuel emblématique de Mythoria : la collection prend la forme d'un **livre ancien** dont chaque page contient des cartes collectionnées.

- Affichage de toutes les cartes obtenues par le joueur.
- **Pages navigables** dans un livre illustré.
- **Filtre par type :**
  - ☀️ Serviteurs de la Lumière — héros
  - 🌑 Serviteurs des Ténèbres — monstres
  - 🐾 Minions — serviteurs
  - ✨ Spells — sorts
- **Filtre par rareté.**
- **Détails d'une carte au clic.**
- **État vide** lorsque la collection ne contient aucune carte.
- **Persistance** de la collection après actualisation (LocalStorage).

### 🃏 My Deck — Création du deck
- Ajouter une carte au deck depuis le grimoire.
- Retirer une carte du deck.
- Affichage des cartes sélectionnées et du nombre total de cartes.
- Taille maximale du deck : **20 cartes**.
- Ajout impossible si le deck est complet.
- Statistiques générales du deck.
- Sauvegarde du deck dans le **LocalStorage**.

---

## 🛠 Technologies

| Domaine | Outil |
|---|---|
| Structure | HTML5 |
| Style | CSS3 (animations, responsive) |
| Logique | JavaScript (ES6+) |
| Persistance | LocalStorage |
| Versionnement | Git / GitHub |
| Hébergement | Vercel |

---

## 📁 Structure du projet

> Adapte cette arborescence à celle de ton dépôt.

```
mythoria/
├── index.html            # Home
├── Boutique.html         # Boutique + panier
├── Booster.html          # Opening Chamber
├── Grimoire.html         # My Grimoire
├── Deck.html             # My Deck
├── css/
│   └── style.css
├── js/
│   ├── cards.js          # Catalogue des cartes
│   ├── boosters.js       # Types de boosters et probabilités
│   ├── storage.js        # Lecture / écriture LocalStorage
│   ├── shop.js           # Boutique et panier
│   ├── opening.js        # Tirage aléatoire + animation
│   ├── grimoire.js       # Livre, pagination, filtres
│   └── deck.js           # Gestion du deck
├── assets/
│   ├── images/
│   └── logo/
└── README.md
```

---

## 🧬 Modèle de données

### Carte

```js
{
  id: "light-hero-001",          // identifiant unique
  name: "Aelith, Gardienne de l'Aube",
  image: "assets/images/aelith.png",
  description: "Une paladine dont la lumière dissipe les ténèbres.",
  type: "light",                 // light | dark | minion | spell
  rarity: "legendary",           // common | rare | epic | legendary
  attack: 7,                     // créatures uniquement
  health: 9,                     // créatures uniquement
  effect: null                   // sorts : effet spécifique
}
```

Les **sorts** possèdent un champ `effect` à la place des statistiques d'attaque et de vie.

### Booster et probabilités

```js
const BOOSTERS = {
  beginner: {
    name: "Beginner Pack",
    cardCount: 5,
    eligibleTypes: ["light", "dark", "minion", "spell"],
    dropRates: { common: 0.70, rare: 0.22, epic: 0.07, legendary: 0.01 }
  },
  legends: {
    name: "Summoning of the Legends",
    cardCount: 5,
    eligibleTypes: ["light", "dark", "minion", "spell"],
    dropRates: { common: 0.40, rare: 0.30, epic: 0.20, legendary: 0.10 }
  }
};
```

> Les valeurs ci-dessus sont des exemples : ajuste-les selon l'équilibrage voulu (la somme des probabilités doit valoir 1).

Une fonction `openBooster(boosterId)` tire d'abord la rareté de chaque carte selon `dropRates`, puis choisit aléatoirement une carte éligible de cette rareté dans le catalogue.

### Clés LocalStorage

| Clé | Contenu |
|---|---|
| `mythoria_cart` | Panier en cours |
| `mythoria_boosters` | Boosters achetés et non ouverts |
| `mythoria_collection` | Cartes obtenues (avec nombre d'exemplaires) |
| `mythoria_deck` | Identifiants des cartes du deck |

---

## 📜 Règles du jeu

- **Collection :** le joueur peut posséder **plusieurs exemplaires** d'une même carte.
- **Deck :** il ne peut contenir qu'**une seule copie de chaque carte unique**.
- **Taille maximale du deck :** **20 cartes**. L'ajout est bloqué une fois la limite atteinte.
- Seules les cartes présentes dans le grimoire peuvent être ajoutées au deck.
- Les types de cartes sont : Serviteurs de la Lumière, Serviteurs des Ténèbres, Minions et Spells.
- Les raretés sont : commune, rare, épique et légendaire.

---

## 🚀 Installation et lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/<ton-utilisateur>/<ton-depot>.git

# 2. Entrer dans le dossier
cd <ton-depot>

# 3. Ouvrir le site
# Option A : double-cliquer sur index.html
# Option B : utiliser l'extension Live Server de VS Code
```

Aucune dépendance ni étape de build : le projet fonctionne directement dans le navigateur.

---

## ☁️ Déploiement

Le site est hébergé sur **Vercel** : chaque `git push` sur la branche principale déclenche un redéploiement automatique.

🔗 https://mythoria-neon.vercel.app/Booster.html

---

## 🗓 Planification des tâches

| Jour | Objectif | Statut |
|---|---|---|
| 1 | Conception, identité visuelle, maquettes | ✅ |
| 2 | Page Home | ✅ |
| 3 | Boutique et panier | ✅ |
| 4 | Mise en ligne Vercel, README, planification | ✅ |
| 5 | Opening Chamber (tirage + animation) | ⏳ |
| 6 | My Grimoire (livre, filtres, détails) | ⏳ |
| 7 | My Deck + finitions | ⏳ |

> Mets à jour ce tableau selon ton planning réel.

---

## 👤 Auteur

Projet réalisé par **<ER-rajy safaa>** dans le cadre d'un projet de développement web.

---

<p align="center"><em>Every Card Tells a Legend ✨</em></p>
