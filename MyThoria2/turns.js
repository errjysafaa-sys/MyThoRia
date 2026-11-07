import { distribuerMainDepart, piocher } from "./cards.js";
import { jouerTourAdversaire } from "./oppo.js";
import { ajouterHistorique, etat } from "./state.js";
import { rafraichir } from "./ui.js";
import { aleatoire, LUMIERE, TENEBRES } from "./utils.js";

export function lancerPiece() {
    etat.premier = aleatoire(0, 1) === 0 ? "joueur" : "adversaire";

    if (etat.premier === "joueur") {
        ajouterHistorique("La pièce désigne le joueur : vous commencez.");
    } else {
        ajouterHistorique("La pièce désigne l'adversaire : il commence.");
    }

    return etat.premier;
}

export function choisirCamp(campJoueur) {
    etat.joueur.camp = campJoueur;
    etat.adversaire.camp = campJoueur === LUMIERE ? TENEBRES : LUMIERE;
    ajouterHistorique("Votre camp : " + campJoueur);
}

function commencerTour(id) {
    const joueur = id === "joueur" ? etat.joueur : etat.adversaire;

    etat.tourDe = id;
    etat.nbInvocation = 0;
    etat.selection = null;

    joueur.terrain.forEach(function (creature) {
        if (creature) creature.epuisee = false;
    });

    const carte = piocher(joueur);
    if (carte) {
        ajouterHistorique(joueur.nom + " pioche une carte.");
    }

    rafraichir();
}

export async function demarrerCombat() {
    distribuerMainDepart(etat.joueur);
    distribuerMainDepart(etat.adversaire);

    etat.enCours = true;
    etat.fini = false;
    etat.numeroTour = 1;

    commencerTour(etat.premier);

    if (etat.premier === "adversaire") {
        await jouerTourAdversaire();
        if (etat.fini) return;

        etat.numeroTour++;
        commencerTour("joueur");
    }
}

export async function tourAdversaireComplet() {
    commencerTour("adversaire");
    await jouerTourAdversaire();

    if (etat.fini) return;

    etat.numeroTour++;
    commencerTour("joueur");
}

export async function finirTourJoueur() {
    if (etat.fini || !etat.enCours || etat.tourDe !== "joueur") return;

    ajouterHistorique("Vous terminez votre tour.");

    await tourAdversaireComplet();
}

export function campAleatoire() {
    return aleatoire(0, 1) === 0 ? LUMIERE : TENEBRES;
}