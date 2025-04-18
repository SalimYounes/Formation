import { Categorie } from "./Categorie.module";
import { SalleDeSport } from "./SalleDeSport.module";

export class CoachSalle {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public categorie?: Categorie,
        public salleDeSport?: SalleDeSport
    ){}
}