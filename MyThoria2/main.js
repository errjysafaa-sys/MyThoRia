
import { etat, nouvellePartie } from "./state.js";
import { afficherModal, afficherMessage, rafraichir } from "./ui.js";
import { aDesCreatures, attaquer } from "./combat.js";
import { attendre } from "./utils.js";
import { invoquerCarte, distribuerMainDepart, piocher, chargerDeck } from "./cards.js";


function autreJoueur(id) {
    return id === "joueur" ? etat.adversaire : etat.joueur;

}
function debutTour(joueur) {
    etat.tourDe = joueur.id;
    etat.nbInvocation = 0;
    etat.selection = null;
    joueur.terrain.forEach(function (c) { if (c) c.epuisee = false; });
    piocher(joueur);

}

function passerLaMain(versId) {
    if (versId === etat.premier) etat.numeroTour++;
    debutTour(versId === "joueur" ? etat.joueur : etat.adversaire)
    rafraichir();
}

async function tourAdversaire() {
    const adv = etat.adversaire;
    rafraichir();
    await attendre(800);
    if (etat.fini) return;


    if (adv.main.length > 0) {
        let meilleur = 0;
        adv.main.forEach(function (c, i) {
            if ((Number(c.attaque) || 0) > (Number(adv.main[meilleur].attaque) || 0)) meilleur = i;
        })
        invoquerCarte(adv, meilleur);
        rafraichir();
        await attendre(800)
    }
    for (let i = 0; i < adv.terrain.length; i++) {
        if (etat.fini) return;
        const creature = adv.terrain[i];
        if (!creature || creature.epuisee) continue;

        let cible = null;
        if (aDesCreatures(etat.joueur)) {
            const indices = [];
            etat.joueur.terrain.forEach(function (c, k) { if (c) indices.push(k); });
            cible = indices[Math.floor(Math.random() * indices.length)];
        }
        attaquer(adv, etat.joueur, i, cible);
        rafraichir();
        await attendre(800);
    }
    if (!etat.fini) passerLaMain("joueur");
}

async function finDeTourJoueur() {
    if (!etat.enCours || etat.fini || etat.tourDe !== "joueur") return;
    passerLaMain("adversaire");
    await tourAdversaire();
}

function brancherEvenements() {
    // invoquer une carte de la main
    document.getElementById("main-joueur").addEventListener("click", function (e) {
        const bouton = e.target.closest("button[data-index]");
        if (!bouton) return;
        const res = invoquerCarte(etat.joueur, Number(bouton.dataset.index));
        if (!res.ok) afficherMessage(res.raison);
        rafraichir();
    });

    // sélectionner une de ses créatures
    document.getElementById("terrain-joueur").addEventListener("click", function (e) {
        const el = e.target.closest("[data-index]");
        if (!el || etat.tourDe !== "joueur" || etat.fini) return;
        const index = Number(el.dataset.index);
        if (etat.joueur.terrain[index].epuisee) return afficherMessage("Cette créature est épuisée.");
        etat.selection = etat.selection === index ? null : index;
        rafraichir();
    });

    // attaquer une créature adverse (ou directement l'adversaire si son terrain est vide)
    document.getElementById("terrain-adversaire").addEventListener("click", function (e) {
        if (etat.selection === null) return afficherMessage("Sélectionnez d'abord une de vos créatures.");
        const el = e.target.closest("[data-index]");
        const cible = aDesCreatures(etat.adversaire) ? (el ? Number(el.dataset.index) : undefined) : null;
        if (cible === undefined) return;
        const res = attaquer(etat.joueur, etat.adversaire, etat.selection, cible);
        if (!res.ok) afficherMessage(res.raison);
        rafraichir();
    });

    document.querySelector(".end-turn").addEventListener("click", finDeTourJoueur);
}

async function init() {
    const deck = await chargerDeck();
    if (deck.length === 0) {
        afficherModal("Deck vide", "Ajoutez des cartes à votre deck dans la page My Deck.", [
            { label: "Aller au deck", action: function () { window.location.href = "../deck.html"; } }
        ]);
        return;
    }
    nouvellePartie(deck);
    distribuerMainDepart(etat.joueur);
    distribuerMainDepart(etat.adversaire);
    etat.enCours = true;
    brancherEvenements();

    const premier = etat.premier === "joueur" ? etat.joueur : etat.adversaire;
    debutTour(premier);
    rafraichir();
    if (etat.tourDe === "adversaire") await tourAdversaire();
}

init();
