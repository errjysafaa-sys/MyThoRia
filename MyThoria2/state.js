import { generateId, formatDate, melanger } from "utils.js";


export const CONFIG = {
    HP_DEPART: 3000,
    MAIN_MAX: 5,
    DECK_APERCU: 5,
    PENELITE: 0.2,
    INOVACATION_PAR_TOUR: 1,
    CLE_DECK: "mythoria_deck",
    CLE_HISTORIQUE: "mythoria_dernier_combat";

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