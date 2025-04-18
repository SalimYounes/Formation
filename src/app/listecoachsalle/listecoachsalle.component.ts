import { Component } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CoachSalle } from '../Entité/CoachSalle.module';

@Component({
  selector: 'app-listecoachsalle',
  templateUrl: './listecoachsalle.component.html',
  styleUrls: ['./listecoachsalle.component.css']
})
export class ListecoachsalleComponent {
  listecoachsalle:CoachSalle[];
  p:number=1;
collection:any[]
  constructor(private service:CrudserviceService,private router:Router,private toast:NgToastService ) { }

ngOnInit(): void {
  this.service.getCoachSalle().subscribe(CoachSalle =>{
    this.listecoachsalle= CoachSalle
})
}

}
