import { Client } from "./Client.module";
import { Pack } from "./Pack.module";

export class Abonnement{
    constructor(
        public id?:number,
        public datedebut?:Date,
        public datefin?:Date,
        public client?:Client,
        public pack?:Pack,
    ){}
}