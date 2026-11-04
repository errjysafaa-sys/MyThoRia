export const LUMIERE ="Lumiére";
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
        const j=aleatoire(0,1);
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