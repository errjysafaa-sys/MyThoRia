import { distribuerMainDepart, piocher } from "./cards.js";
import { jouerTourAdversaire } from "./oppo.js";
import { ajouterHistorique, etat } from "./state.js";
import { rafraichir } from "./ui.js";
import { aleatoire, LUMIERE, TENEBRES, campOppose } from "./utils.js";

export function lancerPiece() {
    if (aleatoire(0, 1) === 0) {
        etat.premier = "joueur";

    } else {
        etat.premier
    }
    if (etat.premier === "joueur") {
        ajouterHistorique("La pièce désigne le joueur : vous commencez.");
    } else {
        ajouterHistorique("La pièce désigne l'adversaire : il commence.");
    }

    return etat.premier;
}

export function choisirCamp(campJoueur) {
    etat.joueur.camp = campJoueur;
    attaquer.adversaire.camp = campOppose(campJoueur)
    ajouterHistorique("Votre camp :" + campJoueur)
}

function commencerTour(id) {
    const joueur = id === "joueur" ? etat.joueur : etat.adversaire;


    etat.tourDe = id;
    etat.nbInvocation = 0;
    etat.selection = null;

    for (let i = 0; i < joueur.terrain.length, i++) {
        if (joueur.terrain[i] !== null) {
            joueur.terrain[i].epuisee = false;
        }
    }
    // ajouterHistorique("--- Tour " + etat.numeroTour + " : " + joueur.nom + " ---");
    const carte = pioche(joueur);
    if (carte) {
        ajouterHistorique(joueur.nom + "pioche une carte.");
    }
}

export async function demarrerCombat() {
    distribuerMainDepart(etat.joueur);
    distribuerMainDepart(etat.adversaire);
    etat.enCours = true;
    etat.numeroTour = 1

    if (etat.premier === "joueur") {
        commencerTour("joueur");
        rafraichir()

    } else {
        await tourAdversaireComplet();
    }
}

export async function tourAdversaireComplet() {
    commencerTour("adversaire");
    rafrichair();
    await jouerTourAdversaire();
    if (etat.fini) return;

    etat.numeroTour++;
    commencerTour("joueur");
    rafraichir();
}
export function finirTourJoueur() {
    if (etat.fini || etat.tourDe !== "joueur") return;

    ajouterHistorique("Vous terminer votre tour. ")
    etat.numeroTour++
    await tourAdversaireComplet();
}
export function campAleatoire() {
    if (aleatoire(0, 1) === 0) return LUMIERE;

    return TENEBRES
}