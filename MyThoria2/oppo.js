import{etat} from "./state.js";
import { attaquer ,calculerStats} from "./combat.js";
import { invoquerCarte } from "./cards";
import { attendre } from "./utils";
import { rafraichir } from "./ui.js";
function choisirCamp (joueur){
    let indexCible=null;

    for(let i=0;i<joueur.terrain.length;i++){
        const creature =joueur.terrain[i];
        if(creature!== null ){
            if(indexCible===null){
                indexCible=i ;

            }else if (creature.pv<joueur.terrain[indexCible].pv){
                indexCible=i;
            }
        }
    }
    return  indexCible;
}

export async function jouerTourAdversaire(){
    const ia =etat.adversaire;
    await attendre(700)

    if (ia.main.length>0){

        let meilleur=0;
        for( let i=1;i<ia.main.length;i++){
            const attaqueCarte=calculerStats(ia.main[i],ia.camp).attaque;
            const attaqueMeilleure=calculerStats(ia.main[meilleur], ia.camp).attaque;

            if (attaqueCarte>attaqueMeilleure) meilleur=i
        }
    }
    const resultat=invoquerCarte(ia,meilleur);
    if (resultat.ok){
        rafraichir();
        await(700)
    }
}