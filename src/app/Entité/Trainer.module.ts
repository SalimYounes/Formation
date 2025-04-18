import { User } from "./User.module";

export class Trainer{
    constructor(
        public id?:number,
        public nom?:string,
        public prenom?:string,
        public email?:string,
        public tel?:number,
        public type?:string,
        public employeur?:string,
        public user?:User
       
    ){}
}