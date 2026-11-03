import { createElement } from "react";

export function renderList(conteneur, items, creerElemenetItem) {
    conteneur.replaceChildren();
    items.forEach((item, index) => {
        conteneur.appenChild(creerElemenetItem(item, index))
    })
}
function clearForm(formulaire) {
    if (formulaire) formulaire.reset()
}
function creerElemenet(balise, classes, texte = "") {
    const element = document.createElement(balise)
    element.className = classes;
    element.textContent = texte;
    return element;
}

function couleurRarete(couleurRarete) {
    switch (rarete) {
        case "Rare": return "bg-blue-700 text-white ";
        case "Epique": return "bg-purple-700 text-white "

        case "Legendaire": return "bg-gray-700 text-white "

    }
}


function ajoutermage(element,illustration){
    if(!illustration) return ;

element.style.backgroundImage =
        `linear-gradient(to top, rgba(10,5,3,.95), rgba(10,5,3,.1) 100%), url("${illustration}")`;
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
}
function creerCarteMain(carte,index){
    const stats =calculerStats (carte,etat.joueur.camp)
    const pourcent =Math.random(CONFIG.PENELITE *100)
    const bouton = creerElemenet("button","relative flex-col justify-end overflow-hidden rounded-xl border border-amber-300/50 bg-gradient-to-br from-amber-950 via-[#292018] to-[#11101d] p-3 text-left transition duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl sm:min-h-52 ")
     bouton.type ="button"
     bouton.dataset.index=index;
     ajouterImage(bouton,carte.illustration)
     const rarete = creerElemenet("span", `absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-black ${couleurRarete(carte.rarete)}`,
        carte.rarete || "Inconnue")
        const contenu = creerElemenet("span", "relative block")
        contenu.append(
        creerElemenet("span","block text-sm font-black text-amber-100",carte.nom||"Carte sans nom"),
        creerElemenet("span", "mt-1 block text-[11px] text-violet -200,stats.camp"),
        creerElemenet("span","mt-1 block text-xs text-gray-200",`ATK ${stats.attaque} · PV ${stats.pv}`));

        if(stats.malus){
            contenu.appenChild(createElement("span","mt-1 block text-[10px] font-bold text-red-300",`Camp opposé:-${pourcent}%`));
            
        }
        bouton.append(rarete,contenu);
        return bouton;
}


function creerCreature(creature,index,estJoueur){
    let classes="relative flex aspect-[3/4] cursor-ponter flex-col overflow -hidden rounded-lg border p-1 text-[10px] bg-[#1d1421] sm:text-xs"
    classes+= estJoueur? "border-amber-300":"border-red-400";
    if(estJoueur && etat.selection === index) classes+="ring-2 ring-amber-300"
    if(creature.epuisee) classes+="opacity-50 grayscale"

    const element =creerElemenet("div",classes)
    element.dataset.index=index;
    ajouterImage(element,creature.illustration);

    const contenu =createElement("div", "relative")
    contenu.append(
          creerElement("p", "font-black text-amber-100", creature.nom),
        creerElement("p", "text-red-300", `ATK ${creature.attaque}`),
        creerElement("p", "text-emerald-300", `PV ${creature.pv}/${creature.pvMax}`)
    )
    if(creature.malus)contenu.appenChild(creerElemenet("p","text-[9px] text-red-300","malus camp"))
            if(creature.epuisee)contenu.appenChild(creerElemenet("p","text-[9px] text-yellow-300","épuisée"))

                element.appenChild(contenu);
                return element;
}
function creerEmplacementVide(){
    return creerElemenet("div","aspect-[3/4] rounded-lg border border-dashed border-violet-500/30 bg-[#1d1421]")

}
function creetDosCarte(){

}
function afficherTerrain(idConteneur, joueur, estJoueur) {
    renderList($(idConteneur), joueur.terrain, (creature, index) =>
        creature ? creerCreature(creature, index, estJoueur) : creerEmplacementVide()
    );
}

