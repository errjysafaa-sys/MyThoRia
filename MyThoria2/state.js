import { generateId, formatDate, melanger, obtenirCamp, LUMIERE, TENEBRES } from "./utils.js";

export const CONFIG = {
    HP_DEPART: 3000,
    MAIN_MAX: 5,
    DECK_APERCU: 5,
    PENELITE: 0.2,
    INOVACATION_PAR_TOUR: 1,
    CLE_DECK: "mythoria_deck",
    CLE_HISTORIQUE: "mythoria_dernier_combat",
    PREFIXE_IMG: "../"
};

export const etat = {
    joueur: null,
    adversaire: null,
    premier: null,
    tourDe: "joueur",
    numeroTour: 1,
    nbInvocation: 0,
    selection: null,
    enCours: false,
    fini: false,
    gagnant: null,
    historique: []
};

export function loadItems(cle) {
    try {
        const donnees = JSON.parse(localStorage.getItem(cle)) || [];
        return Array.isArray(donnees) ? donnees : [];
    } catch (erreur) {
        console.error("erreur de lecture :", erreur);
        return [];
    }
}
export function saveItems(cle, items) {
    try {
        localStorage.setItem(cle, JSON.stringify(items));
    } catch (erreur) {
        console.error("Erreur de sauvegarde:", erreur);
    }
}
export function addItem(liste, texte) {
    const item = { id: generateId(), texte, date: formatDate() };
    liste.push(item);
    return item;
}

export function ajouterHistorique(texte) {
    etat.historique.push(texte);
    console.log(texte);
}

function creerJoueur(id, nom, camp, deck) {
    return {
        id, nom, camp,
        hp: CONFIG.HP_DEPART,
        hpMax: CONFIG.HP_DEPART,
        deck,
        main: [],
        terrain: [null, null, null, null, null]
    };
}

export function nouvellePartie(cartes) {
    let lumiere = 0, tenebres = 0;
    cartes.forEach(c => obtenirCamp(c) === TENEBRES ? tenebres++ : lumiere++);
    const campJoueur = tenebres > lumiere ? TENEBRES : LUMIERE;
    const campAdv = campJoueur === LUMIERE ? TENEBRES : LUMIERE;

    etat.joueur = creerJoueur("joueur", "Vous", campJoueur, melanger(cartes));
    etat.adversaire = creerJoueur("adversaire", "Adversaire", campAdv, melanger(cartes));
    etat.premier = Math.random() < 0.5 ? "joueur" : "adversaire";
    etat.tourDe = etat.premier;
    etat.numeroTour = 1;
    etat.nbInvocation = 0;
    etat.selection = null;
    etat.enCours = false;
    etat.fini = false;
    etat.gagnant = null;
    etat.historique = [];
}
