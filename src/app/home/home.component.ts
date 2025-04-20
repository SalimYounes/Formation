import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../service/crudservice.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 /* totalAdmins:number=0;
  totalClients:number=0;
  totalCoachs:number=0;
  totalSalles:number=0;
  userDetails:any;
  abonnements:Abonnement[]=[];
  title = 'ng-chart';
  chart: any = [];
  SalleDeSport: SalleDeSport[] = [];

 
  constructor(
    private service:CrudserviceService,
  ) { 
    this.userDetails = this.service.userDetails();
  }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(admin =>{
      this.totalAdmins=admin.length})

      this.service.getClient().subscribe(Client =>{
        this.totalClients=Client.length})

        this.service.getCoach().subscribe(Coach =>{
          this.totalCoachs=Coach.length})


          this.service.getSalle().subscribe(SalleDeSport =>{
            this.totalSalles=SalleDeSport.length;
            this.SalleDeSport= SalleDeSport;

            // Filtrer les salles de sport avec l'état true
        const sallesActives = this.SalleDeSport.filter(salle => salle.etat === true);

        // Calculer le nombre de salles de sport actives et inactives
        const nombreSallesActives = sallesActives.length;
        const nombreTotalSalles = this.SalleDeSport.length;

        // Mettre à jour les données du graphique circulaire
        this.updateChart(nombreSallesActives, nombreTotalSalles);
        this.updatePercentageChart();


          });
          this.service.getAbonnement().subscribe(abonnements => {
            this.abonnements = abonnements.filter(a => a.pack.salleDeSport.etat == true);
            this.updateTopMembershipChart();
          });
           
  }

  // Méthode pour mettre à jour le graphique circulaire avec les nouvelles données
  updateChart(nombreSallesActives: number, nombreTotalSalles: number) {
    const circleChart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ["Salles actives", "Salles inactives"],
        datasets: [{
          label: 'Statistiques des salles de sport',
          data: [nombreSallesActives, nombreTotalSalles - nombreSallesActives],
          backgroundColor: [
            '#ff8a65', // Couleur pour les salles actives
            '#9400d3'    // Couleur pour les salles inactives
          ],
          borderColor: [
            '#ff8a65',
            '#9400d3'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Arial',
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Statistiques des salles de sport',
            font: {
              family: 'Arial',
              size: 18,
              weight: 'bold'
            }
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        }
      }
    });
  }
// Méthode pour mettre à jour le graphique des pourcentages de clients, coachs, et salles de sport
updatePercentageChart() {
  const totalUsers = this.totalClients + this.totalCoachs + this.totalSalles;

  const percentageClients = (this.totalClients / totalUsers) * 100;
  const percentageCoachs = (this.totalCoachs / totalUsers) * 100;
  const percentageSalles = (this.totalSalles / totalUsers) * 100;

  const percentageChart = new Chart('percentageCanvas', {
    type: 'pie',
    data: {
      labels: ["Clients", "Coachs", "Salles de sport"],
      datasets: [{
        label: 'Pourcentage des utilisateurs',
        data: [percentageClients, percentageCoachs, percentageSalles],
        backgroundColor: ['#ff8a65', '#4bc0c0', '#9400d3'],
        borderColor: ['#ff8a65', '#4bc0c0', '#9400d3'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Arial',
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: 'Pourcentage des utilisateurs sur la plateforme',
          font: {
            family: 'Arial',
            size: 18,
            weight: 'bold'
          }
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      }
    }
  });
}
// Méthode pour mettre à jour le graphique des salles de sport avec le plus d'abonnements
updateTopMembershipChart() {
  // Calculate number of memberships per sports hall
  const salleMemberships = this.SalleDeSport.filter(s => s.etat == true).map(salle => {
    const nombreAbonnements = this.abonnements.filter(abonnement => abonnement.pack.salleDeSport.id === salle.id).length;
    return { salle: salle.nom, nombreAbonnements: nombreAbonnements };
  });

  // Sort by number of memberships in descending order
  const sortedSalles = salleMemberships.sort((a, b) => b.nombreAbonnements - a.nombreAbonnements);
  const topSalles = sortedSalles.slice(0, 5); // Get top 5 salles

  const labels = topSalles.map(salle => salle.salle);
  const data = topSalles.map(salle => salle.nombreAbonnements);

  // Define a set of different colors
  const colors = ['#4bc0c0', ' #8B65D2', '#36a2eb', '#ffce56', '#9966ff'];

  const barChart = new Chart('barCanvas', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Nombre d\'abonnements',
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Top 5 des salles de sport par nombre d\'abonnements',
          font: {
            family: 'Arial',
            size: 18,
            weight: 'bold'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Arial',
              size: 14
            }
          }
        },
        x: {
          ticks: {
            font: {
              family: 'Arial',
              size: 14
            }
          }
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      }
    }
  });
}

 */ 

}
