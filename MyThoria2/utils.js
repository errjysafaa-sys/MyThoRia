export const LUMIERE ="Lumière";
export const TENEBRES="Ténèbres";

export function generateId(){
    return Date.now().toString(36)+Math.random().toString(36).slice(2,7);

}
export function formatDate(){
    return new Date().toLocaleDateString("fr-FR")
}

export function aleatoire(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

export function melanger(liste){
    const copie =[...liste];

    for(let i=copie.length-1; i>0; i--){
        const j=aleatoire(0,i);
        const temporaire=copie[i];
        copie[i]=copie[j];
        copie[j]=temporaire
    }
    return copie
}
export function attendre(ms){
    return new Promise(function(resolve){

        setTimeout(resolve,ms)
    })
}

// Camp de la carte : champ "camp"/"faction" s'il existe, sinon camp stable déduit du nom
export function obtenirCamp(carte) {
    const brut = String(carte.camp || carte.faction || "").toLowerCase();
    if (brut.startsWith("t")) return TENEBRES;
    if (brut.startsWith("l")) return LUMIERE;
    let somme = 0;
    for (const lettre of String(carte.nom || carte.id || "")) somme += lettre.charCodeAt(0);
    return somme % 2 === 0 ? LUMIERE : TENEBRES;
}

export function obtenirIllustration(carte) {
    return carte.illustration || carte.image || carte.img || "";
}
