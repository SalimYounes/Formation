import { SalleDeSport } from "./SalleDeSport.module";

export class Pack {
    constructor(
        public id?: number,
        public nom?: string,
        public prix?: number,
        public description?: string,
        public image?: string,
        public idCategorie?: number,
        public salleDeSport?: SalleDeSport
    ){}
}