import { etat } from "./state.js";
import { attaquer, calculerStats } from "./combat.js";
import { invoquerCarte } from "./cards";
import { attendre } from "./utils";
import { rafraichir } from "./ui.js";

function choisirCible(joueur) {
    let indexCible = null;

    for (let i = 0; i < joueur.terrain.length; i++) {
        const creature = joueur.terrain[i];

        if (creature !== null) {
            if (indexCible === null) {
                indexCible = i;

            } else if (creature.pv < joueur.terrain[indexCible].pv) {
                indexCible = i;
            }
        }
    }
    return indexCible;
}

export async function jouerTourAdversaire() {
    const ia = etat.adversaire;
    const joueur = etat.joueur;
    await attendre(700)

    if (ia.main.length > 0) {

        let meilleure = 0;
        for (let i = 1; i < ia.main.length; i++) {
            const attaqueCarte = calculerStats(ia.main[i], ia.camp).attaque;
            const attaqueMeilleure = calculerStats(ia.main[meilleur], ia.camp).attaque;

            if (attaqueCarte > attaqueMeilleure) meilleure = i
        }
        const resultat = invoquerCarte(ia, meilleure);
        if (resultat.ok) {
            rafraichir();
            await (700)
        }
    }

    for (let i = 0; i < ia.terrain.length; i++) {
        if (etat.fini) return;

        const creature = ia.terrain[i];

        if (creature !== null && !creature.epuisee) {
            const cible = choisirCible(joueur);
            attaquer(ia, joueur, i, cible);
            rafraichir();
            await attendre(700)
        }

    }
}
