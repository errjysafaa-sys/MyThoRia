import { etat } from "./state.js";
import { attaquer, calculerStats } from "./combat.js";
import { invoquerCarte } from "./cards.js";
import { attendre } from "./utils.js";
import { rafraichir } from "./ui.js";

function choisirCible(joueur) {
    let indexCible = null;

    for (let i = 0; i < joueur.terrain.length; i++) {
        const creature = joueur.terrain[i];

        if (creature !== null) {
            if (indexCible === null || creature.pv < joueur.terrain[indexCible].pv) {
                indexCible = i;
            }
        }
    }

    return indexCible;
}

export async function jouerTourAdversaire() {
    const ia = etat.adversaire;
    const joueur = etat.joueur;

    etat.tourDe = "adversaire";
    await attendre(700);

    if (etat.fini) return;

    if (ia.main.length > 0) {
        const index = choisirMeilleurCarte(ia.main, ia.camp);
        const resultat = invoquerCarte(ia, index);

        if (resultat.ok) {
            rafraichir();
            await attendre(700);
        }
    }

    for (let i = 0; i < ia.terrain.length; i++) {
        if (etat.fini) return;

        const creature = ia.terrain[i];

        if (creature !== null && !creature.epuisee) {
            const cible = choisirCible(joueur);
            const resultat = attaquer(ia, joueur, i, cible);

            rafraichir();
            await attendre(700);

            if (!resultat.ok) continue;
        }
    }
}

function choisirMeilleurCarte(main, camp) {
    if (main.length === 0) return -1;

    let meilleure = 0;

    for (let i = 1; i < main.length; i++) {
        const attaque = calculerStats(main[i], camp).attaque;
        const meilleureAttaque = calculerStats(main[meilleure], camp).attaque;

        if (attaque > meilleureAttaque) {
            meilleure = i;
        }
    }

    return meilleure;
}




