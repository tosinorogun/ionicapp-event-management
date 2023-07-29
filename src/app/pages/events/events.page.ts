import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  alertMessage = 'This is module is not available at this time, please check back later.';

  constructor(
    public restApi: RestService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.infoAlert();
  }

  async infoAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Module not Available',
      message: this.alertMessage,
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [
        {
          text: 'Ok, I get it',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
      // this.restApi.doNavigate('root', '/tabs/home');
  }

}
