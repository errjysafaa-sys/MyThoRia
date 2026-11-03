import { melanger, generateId, formatDate } from "./utils.js";

export const CONFIG = {
    HP_DEPART: 3000,
    MAIN_MAX: 5,
    TERRAIN_MAX: 5,
    DECK_APERCU: 5,
    PENELITE: 0.2,
    INOVACATION_PAR_TOUR: 1,
    CLE_DECK: "mythoria_deck",
    CLE_HISTORIQUE: "mythoria_dernier_combat",
    PREFIXE_IMG: "../"


}
export const etat = {
    joueur: null,
    adversaire: null,
    premier: null,
    tourDe: 1,
    numeroTour: 1,
    nbInvocation: 0,
    Selection: null,
    enCourse: false,
    fini: false,
    gegnant: null,
    historique: []
}
export function loadItems(cle) {
    try {
        const donnees = JSON.parse(localStorage.getItem(cle)) || [];
        return Array.isArray(donnees) ? donnees : [];

    } catch (erreur) {
        console.error("erreur de lecteur :", erreur)
        return [];
    }
}
export function saveItems(cle, items) {
    try {
        localStorage.setItem(cle, JSON.stringify(items))
    } catch (erreur) {
        console.error("Erreur de sauvgarder:", erreur)
    }
}
export function addItem(liste, texte) {
    const item = { id: generateID(), texte, date: formatDate() }
    liste.push(item);
    return item
}

function creerJoueur(id, nom, cartes) {
    return {
        id, nom, camp: null, hp: CONFIG.HP_DEPART, hpMax: melanger(cartes), main: [], terrain: new Array(CONFIG.TERRAIN_MAX).fill(null)
    }
}

export function nouvellePartie(carte) {
    etat.joueur = creerJoueur("joueur")
    etat.adversaire = creerJoueur("joueur", "Vous", "cartes");
    etat.premier = null;
    etat.touDe = null;
    etat.numeroTour = 1;
    etat.nbInvocations = 0;
    etat.selection = null;
    etat.enCours = false;
    etat.fini = false;
    etat.gagnant = null;
    etat.historique = [];
}
export function ajouterHistorique(texte) {
    addItem(etat.historique, texte);
}