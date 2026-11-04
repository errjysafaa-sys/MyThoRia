// export function renderList(conteneur, items, creerElemenetItem) {
//     conteneur.replaceChildren();
//     items.forEach((item, index) => {
//         conteneur.appenChild(creerElemenetItem(item, index))
//     })
// }
// function clearForm(formulaire) {
//     if (formulaire) formulaire.reset()
// }
// function creerElemenet(balise, classes, texte = "") {
//     const element = document.createElement(balise)
//     element.className = classes;
//     element.textContent = texte;
//     return element;
// }

// function couleurRarete(couleurRarete) {
//     switch (rarete) {
//         case "Rare": return "bg-blue-700 text-white ";
//         case "Epique": return "bg-purple-700 text-white "

//         case "Legendaire": return "bg-gray-700 text-white "

//     }
// }


// function ajoutermage(element,illustration){
//     if(!illustration) return ;

// element.style.backgroundImage =
//         `linear-gradient(to top, rgba(10,5,3,.95), rgba(10,5,3,.1) 100%), url("${illustration}")`;
//     element.style.backgroundSize = "cover";
//     element.style.backgroundPosition = "center";
// }

import { etat, nouvellePartie } from "./state.js";
import { afficherModal, fermerModal, afficherMessage, afficherTout } from "./ui.js";


