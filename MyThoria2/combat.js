import { CONFIG, etat, saveItems } from "./state.js";
import { obtenirCamp } from "./utils.js";

export  function calculerStats(carte ,campJoueur){

    const campCarte = obtenirCamp(carte);
    let malus =false;
    let facteur=1;
     
    if(campCarte!==campJoueur){


    malus=true;

    facteur=1-CONFIG.PENELITE
}

    const attaque =Number(carte.attaque) ||0;
    const vie =Number(carte.defense || carte.pv)||1;
    
    return{
        camp : campCarte, 
        maluse:malus,
        attaque:Math.round(attaque*facteur),
        pv:Math.max(1,Math.round(vie*facteur))
    }
}
 