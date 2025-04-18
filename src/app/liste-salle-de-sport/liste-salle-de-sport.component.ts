import { Component } from '@angular/core';
import { SalleDeSport } from '../Entité/SalleDeSport.module';
import { Router } from '@angular/router';
import { CrudserviceService } from '../service/crudservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-salle-de-sport',
  templateUrl: './liste-salle-de-sport.component.html',
  styleUrls: ['./liste-salle-de-sport.component.css']
})
export class ListeSalleDeSportComponent {
  listesalle:SalleDeSport[];
  p:number=1;
  collection:any[]
  constructor(private service:CrudserviceService,private router:Router){}

  //supprimer
  DeleteSalle(salledesport: SalleDeSport) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous supprimer cette salle de sport avec l'ID " + salledesport.id + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteSalle(salledesport.id).subscribe(() => {
          Swal.fire({
            title: "Supprimée !",
            text: "La salle de sport a été supprimée.",
            icon: "success",
          }).then(() => {
            window.location.reload();
            this.router.navigate(['listesalledesport']);
          });
        });
      }
    });
  }

ngOnInit(): void {
  this.service.getSalle().subscribe(SalleDeSport => {
    this.listesalle = SalleDeSport
  })
}

updateSalle(salledesport:SalleDeSport){
  console.log(salledesport);

  let index=this.listesalle.indexOf(salledesport);
  if(salledesport.etat==true)
  {let newsalle=new SalleDeSport(salledesport.id,salledesport.nom,salledesport.adresse,salledesport.email,salledesport.mp,salledesport.tel,false,)
this.service.updateSalle(salledesport.id,newsalle).subscribe
(
  res=>{console.log(res)
  this.listesalle[index]=newsalle
  Swal.fire({
    icon: "error",
    title: "Compte désactivé",
    text: "Le compte a été désactivé avec succès.",
    showConfirmButton: false,
    timer: 3000
  });
  },
  err=>console.log(err)
)
  }
 
  else{

    let newsalle=new SalleDeSport (salledesport.id,salledesport.nom,salledesport.adresse,salledesport.email,salledesport.mp,salledesport.tel,true,)
    this.service.updateSalle(salledesport.id,newsalle).subscribe
  (
    res=>{console.log(res)
    this.listesalle[index]=newsalle
    Swal.fire({
      title: "Succès !",
      text: "Le compte de l'utilisateur a été activé avec succès.",
      icon: "success",
      showConfirmButton: false,
      timer: 3000
    });
    },
    err=>console.log(err)
  )

  }



}

}
