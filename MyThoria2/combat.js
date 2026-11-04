import { CONFIG, etat, ajouterHistorique } from "./state.js";
import { obtenirCamp } from "./utils.js";

export function calculerStats(carte, campJoueur) {

    const campCarte = obtenirCamp(carte);
    let malus = false;
    let facteur = 1;

    if (campCarte !== campJoueur) {


        malus = true;

        facteur = 1 - CONFIG.PENELITE
    }

    const attaque = Number(carte.attaque) || 0;
    const vie = Number(carte.defense || carte.pv) || 1;

    return {
        camp: campCarte,
        maluse: malus,
        attaque: Math.round(attaque * facteur),
        pv: Math.max(1, Math.round(vie * facteur))
    }
}

export function aDesCreatures(joueur) {
    for (let i = 0; i < joueur.terrain.length; i++) {
        if (joueur.terrain[i] !== null) return true
    }
    return false
}

// indexCible === null : attaque directe sur le joueur adverse (seulement si son terrain est vide)
export function attaquer(attaquant, defenseur, indexAtt, indexCible) {
    if (etat.fini) return { ok: false, raison: "Le combat est terminé." };
    if (etat.tourDe !== attaquant.id) return { ok: false, raison: "Ce n'est pas votre tour." };

    const att = attaquant.terrain[indexAtt];
    if (!att) return { ok: false, raison: "Choisissez d'abord une de vos créatures." };
    if (att.epuisee) return { ok: false, raison: "Cette créature est épuisée." };

    if (indexCible === null) {
        if (aDesCreatures(defenseur)) return { ok: false, raison: "Détruisez d'abord les créatures adverses." };
        defenseur.hp = Math.max(0, defenseur.hp - att.attaque);
        ajouterHistorique(att.nom + " frappe " + defenseur.nom + " (-" + att.attaque + " HP)");
    } else {
        const cible = defenseur.terrain[indexCible];
        if (!cible) return { ok: false, raison: "Aucune cible ici." };
        cible.pv -= att.attaque;
        if (cible.pv <= 0) {
            defenseur.terrain[indexCible] = null;
            ajouterHistorique(att.nom + " détruit " + cible.nom);
        } else {
            att.pv -= cible.attaque;            // riposte
            if (att.pv <= 0) {
                attaquant.terrain[indexAtt] = null;
                ajouterHistorique(cible.nom + " détruit " + att.nom + " en ripostant");
            }
        }
    }
    att.epuisee = true;
    etat.selection = null;

    if (defenseur.hp <= 0) {
        etat.fini = true;
        etat.gagnant = attaquant.id;
    }
    return { ok: true };
}
