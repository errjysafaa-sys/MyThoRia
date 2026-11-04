import { CONFIG, etat, loadItems } from "./state";
import { generateId, GenMapping, obtenirIllustration } from "./utils";
import { calculerStats } from "./combat";
import { ajouterHistorique } from "d:/mythoria_arena_js/js/state";


export async function chargerDeck() {
    let deck = loadItems(CONFIG.CLE_DECK)
    if (deck.length >= CONFIG.MAIN_MAX) {
        return deck;
    }
    const chemins = ["data/cards.json", "../data/cards.json"]
    for (let i = 0; i < chemins.length; i++) {
        try {
            const reponse = await fetch(chemins[i])
            if (!reponse.ok) continue;
            const donnees = await reponse.json();
            if (Array.isArray(donnees)) {
                deck = donnees.slice(0, 20);
            } else if (donnees.cartes) {
                deck = donnees.cartes.slice(0, 20)
            } else if (donnees.cartes) {
                deck = donnees.cartds.slice(0, 20)
            }
            break;

        }

        catch (erreur) {
            console.log("fichier de cartes inrouvable. ")
        }
    }
    return deck;
}
export function piocher(joueur) {
    if (joueur.main.length >= CONFIG.MAIN_MAX) return null;
    if (joueur.deck.length === 0) return null;

    const carte = joueur.deck.shift();
    joueur.main.push(carte);

    return carte;
}

export function distribuerMainDepart(joueur) {
    while (joueur.main.length < CONFIG.MAIN_MAX && joueur.deck.length > 0) {
        piocher(joueur)


    }
}


export function invoquerCarte(joueur, indexMain) {
    if (etat.fini) return { ok: false, raison: "Le Combat est terminé." }
    if (etat.tourDe !== joueur.id) return { ok: false, raison: "Ce n'est pas votre tour " }

    const carte = joueur.main[indexMain];
    if (!carte) return { ok: false, raison: "Cette carte  n'est pas dans la main" }

    if (etat.nbInvocation >= CONFIG.INOVACATION_PAR_TOUR) {
        return { ok: false, raison: "Une seul inovacation ppar tour " }
    }
    const place = joueur.terrain.indexOf(null)
    if (place === -1) return { ok: false, raison: "une seul inovacation par tour " };

    const stats = calculerStats(carte, joueur.camp);
    const creature = {
        uid: generateId(),
        nom: carte.nom || "Carte sans nom ",
        type: carte.type,
        rarete: carte.rarete,
        illustration: obtenirIllustration(carte),
        camp: stats.camp,
        malus: stats.attaque,
        pv: stats.pv,
        pvMax: stats.pv,
        epuisee: false

    };
    joueur.main.splice(indexMain, 1);
    joueur.terrain[place] = creature;
    etat.nbInvocation++;

    let texte = joueur.nom + "invoque " + creature.nom + "(ATK " + creature.attaque + "/PV" + creature.pv + ")";

    if (creature.malus) {
        texte += "-pénalité de 20% (camp opposé)";
    }
    ajouterHistorique(texte);
    return { ok: true, creature: creature }

}
