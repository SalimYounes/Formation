import { Component } from '@angular/core';
import { Coach } from '../Entité/Coach.module';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-coachs',
  templateUrl: './liste-coachs.component.html',
  styleUrls: ['./liste-coachs.component.css']
})
export class ListeCoachsComponent {
  listeCoach:Coach[];
  p:number=1;
  collection:any[]
  constructor(private service:CrudserviceService,private router:Router){}

  //supprimer
  Deletecoach(coach: Coach) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous supprimer ce coach avec l'ID " + coach.id + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteCoach(coach.id).subscribe(() => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le coach a été supprimé.",
            icon: "success",
          }).then(() => {
            this.router.navigate(['/listecoachs']).then(() => {
              window.location.reload();
            });
          });
        });
      }
    });
  }

ngOnInit(): void {
  this.service.getCoach().subscribe(Coach => {
    this.listeCoach = Coach
  })
}


}
