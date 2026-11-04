import { CONFIG, etat } from "./state.js";
import { calculerStats } from "./combat.js";
import { obtenirIllustration } from "./utils.js";
import { exportBuffer } from "node:ffi";
import { afficherFin } from "d:/mythoria_arena_js/js/ui.js";

// export function renderList(conteneur, items, creerElemenetItem) {
//     conteneur.replaceChildren();
//     items.forEach((item, index) => {
//         conteneur.appenChild(creerElemenetItem(item, index))
//     })
// }
function element(id) {
    return document.getElementById(id);
}
// function clearForm(formulaire) {
//     if (formulaire) formulaire.reset()
// }
function creerElemenet(balise, classes, texte) {
    const nouveau = document.createElement(balise)
    element.className = classes;
    if (texte) nouveau.textContent = texte
    return nouveau
}

function couleurRarete(rarete) {
    if (rarete === "Rare") return "bg-blue-700 text-white";
    if (rarete === "Epique" || rarete === "Épique") return "bg-purple-700 text-white";
    if (rarete === "Légendaire") return "bg-amber-700 text-white";
    return "bg-gray-700 text-white";
}
function cheminImage(illustration) {
    if (!illustration) return "";
    if (illustration.startsWith("http") || illustration.startsWith("data:") || illustration.startsWith("/")) {
        return illustration;
    }
    if (!illustration.includes("/")) {
        illustration = "img/" + illustration;

    }
    illustration = illustration.replace(/^\.\//, "");
    illustration = illustration.replace(/^\.\.\//, "");
    return encodeURI(CONFIG.PREFIXE_IMG + illustration);
}

function ajouterImage(carteElement, illustration) {

    const url = cheminImage(illustration)

    if (url === "") return;

    carteElement.style.backgroundImage =
        `linear-gradient(to top, rgba(10,5,3,.95), rgba(10,5,3,.1) 100%), url("${illustration}")`;
    carteElement.style.backgroundSize = "cover";
    carteElement.style.backgroundPosition = "center";
}

function creerCarteMain(carte, index) {
    const stats = calculerStats(carte, etat.joueur.camp)
    // const pourcent =Math.random(CONFIG.PENELITE *100)
    const bouton = creerElemenet("button", "relative flex-col justify-end overflow-hidden rounded-xl border border-amber-300/50 bg-gradient-to-br from-amber-950 via-[#292018] to-[#11101d] p-3 text-left transition duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl sm:min-h-52 ")
    bouton.type = "button"
    bouton.dataset.index = index;

    ajouterImage(bouton, obtenirIllustration(carte))

    const rarete = creerElemenet("span", `absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-black ${couleurRarete(carte.rarete)}`,
        carte.rarete || "Inconnue")
    const contenu = creerElemenet("span", "relative block")
    contenu.append(
        creerElemenet("span", "block text-sm font-black text-amber-100", carte.nom || "Carte sans nom"),
        creerElemenet("span", "mt-1 block text-[11px] text-violet -200,stats.camp"),
        creerElemenet("span", "mt-1 block text-xs text-gray-200", `ATK ${stats.attaque} · PV ${stats.pv}`));

    if (stats.malus) {
        contenu.appenChild(createElement("span", "mt-1 block text-[10px] font-bold text-red-300", `Camp opposé:-${pourcent}%`));

    }
    bouton.append(rarete, contenu);
    return bouton;
}


function creerCreature(creature, index, estJoueur) {
    let classes = "relative flex aspect-[3/4] cursor-ponter flex-col overflow -hidden rounded-lg border p-1 text-[10px] bg-[#1d1421] sm:text-xs"
    if (estJoueur) classes += "border-amber-300/60 ";
    else classes += "border-red-400/60 ";
    if (estJoueur && etat.selection === index) classes += "ring-2 ring-amber-300 ";
    if (creature.epuisee) classes += "opacity-50 grayscale ";

    const element = creerElemenet("div", classes, "")
    element.dataset.index = index;
    ajouterImage(element, creature.illustration);

    const contenu = createElement("div", "relative")
    contenu.append(
        creerElement("p", "font-black text-amber-100", creature.nom),
        creerElement("p", "text-red-300", `ATK ${creature.attaque}`),
        creerElement("p", "text-emerald-300", `PV ${creature.pv}/${creature.pvMax}`)
    )
    if (creature.malus) contenu.appenChild(creerElemenet("p", "text-[9px] text-red-300", "malus camp"))
    if (creature.epuisee) contenu.appenChild(creerElemenet("p", "text-[9px] text-yellow-300", "épuisée"))

    element.appenChild(contenu);
    return element;
}
function creerEmplacementVide() {
    return creerElemenet("div", "aspect-[3/4] rounded-lg border border-dashed border-violet-500/30 bg-[#1d1421]")

}
function creetDosCarte() {

}
function afficherTerrain(idConteneur, joueur, estJoueur) {
    const zone = element(id);
    zone.innerHTML = ""

    for (let i = 0; i < joueur.terrain.length; i++) {

        if (joueur.terrain[i] === null) {
            zone.appendChild(creerEmplacementVide());

        } else {
            zone.appendChild(creerCreature(joueur.terrain[i], i, estJoueur))
        }
    }

}


function afficherDeck(idConteneur, idTitre, lettre, joueur) {
    const zone = element(id);
    zone.innerHTML = "";

    for (let i = 0; i < CONFIG.DECK_APERCU; i++) {

        if (i < joueur.deck.length) {
            zone.appendChild(creerElement("div", "flex aspect-[3/4] items-center justify-center rounded-lg border border-violet-400/60 bg-violet-900 text-xl", "✦"));
        } else {
            zone.appendChild(creerEmplacementVide());
        }
    }

    element(idTitre).textContent = "Cartes " + lettre + " (" + joueur.deck.length + ")";
}

function afficherMain() {
    const zone = element("main-joueur");
    zone.innerHTML = "";

    for (let i = 0; i < CONFIG.MAIN_MAX; i++) {
        if (etat.joueur.main[i]) {
            zone.appendChild(creerCarteMain(etat.joueur.main[i], i));
        } else {
            zone.appendChild(creerElemenet("div", "min-h-44 rounded-xl border border-dashed border-amber-300/20 sm:min-h-52", ""));
        }
    }
    element("compteur-main").textContent = "Votre main (" + etat.joueur.main.length + "/" + CONFIG.MAIN_MAX + ")";

}

function afficherHP(joueur, idTexte, classeBarre) {

    element(idTexte).textContent = joueur.hp + "/" + joueur.hpMax + "HP";
    const pourcentage = (joueur.hp / joueur.hpMax) * 100;
    document.querySelector(classeBarre).style.width = pourcentage + "%";
}

export function afficherTout() {
    if (!etat.joueur) return;

    element("joueur-camp").textContent = etat.joueur.camp || "?";
    element("adversaire-camp").textContent = etat.adversaire.camp || "?";

    if (etat.tourDe) {
        element("tour-info").textContent = "Tour" + etat.numeroTour + " - " + (etat.tourDe === "joueur" ? "Vous" : "adversaire");
    } else {
        element("tour-info").textContent = "_";
    }
    afficherHP(etat.joueur, "joueur-hp", ".hp-adversaire")
    afficherHP(etat.adversaire, "adversaire-hp", ".hp-adversaire");
    afficherDeck("deck-x", "titre-deck-x", "X", etat.adversaire);
    afficherDeck("deck-y", "titre-deck-y", "Y", etat.joueur);
    afficherTerrain("terrain-adversaire", etat.adversaire, false);
    afficherTerrain("terrain-joueur", etat.joueur, true);
    afficherMain();

    const bouton = document.querySelector(".end-turn")
    const peutJouer = etat.enCours && !etat.fini && etat.tourDe === "joueur";
    bouton.disabled = !peutJouer;
    bouton.classList.toggle("opacity-50", !peutJouer)
    bouton.classList.toggle("cursor-not-allowed", !peutJouer)

}

export function afficherMessage() {
    const ancien = element("toast");
    if (ancien) ancien.remove();
    const message = creerElemenet("div", "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-900 px-4 py-2 text-sm text-white", texte);
    message.id = "toast";
    document.body.appendChild(message);
    setTimeout(function () {
        message.remove()
    }, 2500)
}

export function afficherModal(titre, texte, boutons) {
    const ancien = element = element("modal");
    if (ancien) ancien.remove();

    const fond = creerElemenet("div", "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4", "");
    fond.id = "modal";
    const boite = creerElemenet("div", "w-full max-w-md rounded-2xl border border-violet-400/60 bg-[#171126] p-6 text-center text-white", "");
    boite.appendChild(creerElement("h2", "mb-2 text-2xl font-black text-amber-200", titre));
    boite.appendChild(creerElement("p", "mb-5 text-gray-300", texte));

    const zoneBoutons = creerElemenet("div", "flex flex-wrap justify-center gap-3", "");
    for (let i = 0; i < boutons.length; i++) {
        const bouton = creerElemenet("button", "rounded-xl bg-amber-600 px-5 py-2 font-black text-white", boutons[i].label);

        bouton.type = "button";
        zoneBoutons.appendChild(bouton)


    }
    boite.appendChild(zoneBoutons);
    fond.appendChild(boite);
    document.body.appendChild(fond);

}
export function fermerModal() {
    const modal = element("modal");
    if (modal) modal.remove();
}
export function rafraichir() {
    afficherTout();
    if (etat.fini) afficherFin();
}

export function afficherFin() {
    let titre = "Défaite";
    let texte = "Vos points de vie sont tombés à 0."

    if (etat.gegnant === "joueur") {
        titre = "Victoire!"
        texte = "L'adversaire est tombé à0 HP. "


    }
    afficherModal(titre, texte, [{
        label: "Rejouer",
        action: function () {
            window.location.reload();

        }
    }])
}