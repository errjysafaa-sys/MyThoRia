# 🐉 Mythoria — *Every Card Tells a Legend*

> Un site web de **cartes à collectionner** dans un univers fantasy sombre : achète des boosters avec des Coins, ouvre-les, et construis ta collection et ton deck.

🔗 **Site en ligne (Vercel)** : https://mythoria-neon.vercel.app/
🔗 **Page Boutique (Boosters)** : https://mythoria-neon.vercel.app/Booster.html
🔗 **Planification des taches (Github PROJECT)** : https://github.com/users/errjysafaa-sys/projects/10

---

## 📖 Table des matières

1. [Présentation du projet](#-présentation-du-projet)
2. [Fonctionnalités](#-fonctionnalités)
3. [Pages du site](#-pages-du-site)
4. [Les boosters](#-les-boosters)
5. [Le panier](#-le-panier)
6. [Technologies utilisées](#-technologies-utilisées)
7. [Structure du projet](#-structure-du-projet)
8. [Déploiement sur Vercel](#-déploiement-sur-vercel)
9. [Planification des tâches](#-planification-des-tâches)
10. [Auteur](#-auteur)

---

## 🎯 Présentation du projet

**Mythoria** est un site web inspiré des jeux de cartes à collectionner (TCG). Chaque carte possède sa propre histoire, son illustration et sa rareté. Le joueur :

1. découvre l'univers sur la page **Home** ;
2. choisit un **booster** dans la **Boutique** et l'ajoute à son **panier** ;
3. confirme son achat avec ses **Coins** (la monnaie du jeu) ;
4. ouvre ses packs, enrichit son **Grimoire** (collection) et prépare son **Deck**.

### Univers : « un univers, quatre pouvoirs »

Les cartes sont réparties en quatre catégories :

| Catégorie | Description |
|-----------|-------------|
| 🛡️ **Héros** | Des guerriers et des gardiens prêts à défendre leur royaume. |
| 👹 **Monstres** | Des créatures redoutables issues des profondeurs obscures. |
| 🧙 **Minions** | Des serviteurs mystérieux qui renforcent ta stratégie. |
| ✨ **Spells** | Des sorts puissants pour changer le cours d'un combat. |

### Raretés

`Commune` · `Rare` · `Épique` · `Légendaire`

Exemples de cartes légendaires présentées sur la page d'accueil : **Ancient Guardian**, **Moon Sorceress**, **Shadow King**, **Celestial Spirit**.

### Identité visuelle

Thème **dark fantasy** : fond sombre, tons violets/néon, logo doré orné de gemmes, illustrations de châteaux, forêts enchantées et paysages mystérieux.

---

## ✨ Fonctionnalités

- 🏠 Page d'accueil immersive (hero, catégories de cartes, aperçu des boosters, cartes légendaires).
- 🛒 **Boutique de boosters** avec 4 packs aux probabilités de rareté différentes.
- 🧺 **Panier fonctionnel** : ajout de packs, calcul du total en Coins, confirmation d'achat.
- 🗺️ Navigation commune à toutes les pages (header + footer).
- 📱 Design responsive (`meta viewport` configuré).

---

## 🗂️ Pages du site

| Page | Fichier | Rôle |
|------|---------|------|
| **Home** | `index.html` | Présentation de l'univers, des catégories, des boosters et des cartes légendaires. |
| **Boosters (Boutique)** | `Booster.html` | Liste des packs, ajout au panier, total, confirmation d'achat. |
| **Opening** | `opening.html` | Ouverture des boosters achetés. |
| **Grimoire** | `grimoire.html` | Collection de cartes du joueur. |
| **My Deck** | `deck.html` | Construction du deck. |
| **Cartes** | `cards.html` | Catalogue des cartes (lien « Explorer les cartes »). |


---

## 📦 Les boosters

Chaque booster contient **5 cartes**. Les probabilités de tirage dépendent du pack :

| Pack | Description | Prix | Commune | Rare | Épique | Légendaire |
|------|-------------|------|:------:|:----:|:------:|:----------:|
| **Beginner Pack** | Pack du débutant : surtout des communes avec quelques rares. | 🪙 500 | 70 % | 25 % | 5 % | 0 % |
| **Summoning of the Legends** | Pack premium aux meilleures chances de cartes rares, épiques ou légendaires. | 🪙 1000 | 45 % | 35 % | 15 % | 5 % |
| **Dark Summoning** | Booster thématique : monstres, serviteurs des ténèbres et sorts interdits. | 🪙 1500 | 50 % | 35 % | 15 % | 5 % |
| **Lucky Pack** | Pack mystère à composition aléatoire, avec une chance de carte exceptionnelle. | 🪙 2500 | 60 % | 25 % | 10 % | 5 % |

---

## 🛒 Le panier

Le panier est géré côté client (JavaScript) sur la page **Boosters** :

1. Le joueur clique sur **Add** sur le pack souhaité.
2. Le pack apparaît dans la section **Panier**.
3. Le **Total** (en Coins) est recalculé automatiquement.
4. Le bouton **Confirmer l'achat** valide la commande.


---

## 🛠️ Technologies utilisées

> ⚠️ À adapter selon ton code réel.

- **HTML5** — structure des pages
- **CSS3** — mise en page, thème dark fantasy, responsive
- **JavaScript** — logique du panier et interactions
- **Git / GitHub** — versionnement
- **Vercel** — hébergement et déploiement

---

## 📁 Structure du projet



```
mythoria/
├── index.html          # Page d'accueil
├── Booster.html        # Boutique + panier + js
├── img/                # Illustrations (héros, boosters, cartes légendaires…)
└── README.md
```

---

## 🚀 Déploiement sur Vercel

1. Pousser le projet sur GitHub.
2. Se connecter sur [vercel.com](https://vercel.com) et cliquer sur **Add New → Project**.
3. Importer le dépôt GitHub.
4. Laisser les paramètres par défaut (site statique) puis cliquer sur **Deploy**.
5. Chaque `git push` sur la branche principale redéploie automatiquement le site.

---

## 🗓️ Planification des tâches


| Jour | Tâches | Statut |
|------|--------|:------:|
| **Jour 1** | Choix du concept, univers, maquettes / charte graphique, logo | ✅ |
| **Jour 2** | Structure HTML des pages, header/footer, style global | ✅ |
| **Jour 3** | Page Home : hero, catégories, boosters, cartes légendaires | ✅ |
| **Jour 4** | Page Boutique + panier fonctionnel, README, déploiement Vercel | ✅ |
| **Suite** | Opening, Grimoire, My Deck, catalogue de cartes | ⏳ |

---
 

## 👤 Auteur

**Safaa ER-rajy — Projet réalisé dans le cadre de la formation **<YOUCODE SAFI>**.

© 2026 Mythoria. Tous droits réservés.
