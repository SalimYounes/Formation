import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Abonnement } from '../Entité/Abonnement.module';
import { CrudserviceService } from '../service/crudservice.service';

@Component({
  selector: 'app-liste-abonnements',
  templateUrl: './liste-abonnements.component.html',
  styleUrls: ['./liste-abonnements.component.css']
})
export class ListeAbonnementsComponent {
  listeAbonnement:Abonnement[];
  p:number=1;
collection:any[]
  constructor(private service:CrudserviceService,private router:Router,private toast:NgToastService ) { }

ngOnInit(): void {
  this.service.getAbonnement().subscribe(abonnement =>{
    this.listeAbonnement= abonnement
})
}

}
