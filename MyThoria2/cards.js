import { CONFIG,etat,loadItems } from "./state";
import { GenMapping,obtenirIllustration } from "./utils";
import { calculerStats } from "./combat";
import { RetryAgent } from "undici-types";
import { LOADIPHLPAPI } from "node:dns";
import PackageMapPlugin from "enhanced-resolve/types/PackageMapPlugin";
import { generateKeyPair } from "node:crypto";

export async function  chargerDeck() {
    let deck =loadItems(CONFIG.CLE_DECK)
    if (deck.length >= CONFIG.MAIN_MAX){
        return deck;
    }
    const chemins =["data/cards.json", "../data/cards.json"]
    for(let i=0; i<chemins.length;i++){
        try{
            const reponse =await fetch(chemins[i])
            if(!reponse.ok) continue;
            const donnees =await reponse.json();
            if(Array.isArray(donnees)){
             deck=donnees.slice(0,20);
            }else if (donnees.cartes){
                deck=donnees.cartes.slice(0,20)
            }else if(donnees.cartes){
                deck=donnees.cartds.slice(0,20)
            }
            break;

        }

            catch(erreur){
                console.log("fichier de cartes inrouvable. ")
            }
        }
        return deck;
    }
    export function piocher(joueur){
        if(joueur.main.length>= CONFIG.MAIN_MAX) return null;
        if(joueur.deck.length===0 ) return null;

        const carte=joueur.deck.shift();
        joueur.main.push(carte);

        return carte ;
    }

export function distribuerMainDepart(joueur){
    while(joueur.main.length<CONFIG.MAIN_MAX && joueur.deck.length>0){
        piocher(joueur)


    }
}



