import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Entité/Contact.module';
import { CrudserviceService } from '../service/crudservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listecontact',
  templateUrl: './listecontact.component.html',
  styleUrls: ['./listecontact.component.css']
})
export class ListecontactComponent {
  listeContact:Contact[];
  p:number=1;
  constructor(private service:CrudserviceService,private router:Router){}

  //supprimer
  Deletecontact(contact: Contact) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous supprimer ce contact avec l'ID " + contact.id + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteContact(contact.id).subscribe(() => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le contact a été supprimé.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            
            window.location.reload();
            
            this.router.navigate(['/listecontact']);
          });
        });
      }
    });
  }

ngOnInit(): void {
  this.service.getContact().subscribe(Contact => {
    this.listeContact = Contact
  })
}

}
