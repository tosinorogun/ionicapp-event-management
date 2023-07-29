import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  alertMessage = 'This is module is not available at this time, please check back later.';

  constructor(
    public restApi: RestService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.completeScanAlert();
  }

  async completeScanAlert() {
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
