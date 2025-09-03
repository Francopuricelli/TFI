import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, IonicModule],
  // agregar estructura Ionic para que la app cargue el router dentro de ion-app
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
export class App {
  showSplash = true;

  constructor(private router: Router) {
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigate(['/login']);
    }, 3000);
  }
}
