import { etat, nouvellePartie } from "./state.js";
import { afficherModal, afficherMessage, rafraichir } from "./ui.js";
import { aDesCreatures, attaquer } from "./combat.js";
import { invoquerCarte, chargerDeck } from "./cards.js";
import { demarrerCombat, finirTourJoueur } from "./turns.js";

function brancherEvenements() {
    document.getElementById("main-joueur").addEventListener("click", function (e) {
        const bouton = e.target.closest("button[data-index]");
        if (!bouton) return;

        const res = invoquerCarte(etat.joueur, Number(bouton.dataset.index));
        if (!res.ok) afficherMessage(res.raison);
        rafraichir();
    });

    document.getElementById("terrain-joueur").addEventListener("click", function (e) {
        const el = e.target.closest("[data-index]");
        if (!el || etat.tourDe !== "joueur" || etat.fini) return;

        const index = Number(el.dataset.index);
        const creature = etat.joueur.terrain[index];
        if (!creature) return;

        if (creature.epuisee) {
            afficherMessage("Cette créature est épuisée.");
            return;
        }

        etat.selection = etat.selection === index ? null : index;
        rafraichir();
    });

    document.getElementById("terrain-adversaire").addEventListener("click", function (e) {
        if (etat.selection === null) {
            afficherMessage("Sélectionnez d'abord une de vos créatures.");
            return;
        }

        const el = e.target.closest("[data-index]");

        // Si le terrain adverse est vide, un clic n'est pas nécessaire :
        // la créature sélectionnée peut attaquer directement les HP.
        if (!aDesCreatures(etat.adversaire)) {
            const res = attaquer(etat.joueur, etat.adversaire, etat.selection, null);
            if (!res.ok) afficherMessage(res.raison);
            rafraichir();
            return;
        }

        if (!el) return;

        const cible = Number(el.dataset.index);
        const res = attaquer(etat.joueur, etat.adversaire, etat.selection, cible);
        if (!res.ok) afficherMessage(res.raison);
        rafraichir();
    });

    document.querySelector(".end-turn").addEventListener("click", async function () {
        await finirTourJoueur();
        rafraichir();
    });
}

async function init() {
    const deck = await chargerDeck();

    if (deck.length === 0) {
        afficherModal("Deck vide", "Ajoutez des cartes à votre deck dans la page My Deck.", [
            {
                label: "Aller au deck",
                action: function () {
                    window.location.href = "../deck.html";
                }
            }
        ]);
        return;
    }

    nouvellePartie(deck);
    brancherEvenements();

    // Distribue les mains, démarre réellement le combat
    // et lance l'IA automatiquement si elle commence.
    await demarrerCombat();

    rafraichir();
}

init();









