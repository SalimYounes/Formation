import { Component } from '@angular/core';
import { Client } from '../Entité/Client.module';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listeclients',
  templateUrl: './listeclients.component.html',
  styleUrls: ['./listeclients.component.css']
})
export class ListeclientsComponent {
  listeClient:Client[];
  p:number=1;
  collection:any[]
  constructor(private service:CrudserviceService,private router:Router){}

  //supprimer
  Deleteclient(client: Client) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous supprimer ce client avec l'ID " + client.id + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteClient(client.id).subscribe(() => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le client a été supprimé.",
            icon: "success",
          }).then(() => {
            window.location.reload();
            this.router.navigate(['/listeclients']);
          });
        });
      }
    });
  }

ngOnInit(): void {
  this.service.getClient().subscribe(client => {
    this.listeClient = client
  })
}


}
