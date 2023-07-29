import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { RestService } from 'src/app/services/rest.service';
import { ApiEndpoint, MessageHandler } from '../../constants/Constants';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { sanitizeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  credentials: any;
  appUserid: any;
  localStorageData: any;
  loginData: any;
  alertMessage = MessageHandler.MSG.login.message;
  emailValidation = ApiEndpoint.VALIDATE_EMAIL;

  constructor(
    public appComp: AppComponent,
    public alertCtrl: AlertController,
    public restApi: RestService,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
  ) {
    this.restApi.checkUserAuthentication();
  }

  ngOnInit() {
  }

  login(formBody: any) {
    this.restApi.presentLoading('Authenticating').then(()=>{
      const credentials = formBody.value; // Submitted form fieldls

      return new Promise(resolve => {
          this.restApi.createRecord(ApiEndpoint.AUTH_LOGIN, credentials).subscribe((res: any) => {
            this.loadingCtrl.dismiss(); // End Loading screen
            if (res.status === 0) {
              this.alertMessage = res.message;
                this.loadingCtrl.dismiss(); // End Loading screen
                this.presentAlertLogin(); // Show alert
            }else{
              const loginDataCredentials = {
                id: res.data.id,
                hashed: res.data.hashed,
                roleId: res.data.role_id,
                role: res.data.role,
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.email,
                phone: res.data.phone,
                avatar: res.data.avatar,
                token: res.data.token,
                verified: res.data.verified,
                pushNotification: res.data.push_notification,
                emailNotification: res.data.email_notification,
                smsNotification: res.data.sms_notification
              };
              const localVariableData = {
                defaultTabResume: 'employment',
                defaultTabJob: 'available',
                defaultTabConnect: 'chat'
              };

              this.restApi.createLocalStorageData(ApiEndpoint.LOCAL_USERDATA, loginDataCredentials);
              this.restApi.createLocalStorageData(ApiEndpoint.LOCAL_TEMP, localVariableData);
              this.loadingCtrl.dismiss(); // End Loading screen
              this.restApi.doNavigate('root', '/tabs/home');
            }
          }, (err) => {
            console.error(err);
          });
      });

    });
  }

  async presentAlertLogin() {
    const alert = await this.alertCtrl.create({
      header: MessageHandler.MSG.login.header,
      message: this.alertMessage,
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [
        {
          text: MessageHandler.MSG.login.option.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    const optionSelected = (result.role === 'action') ? true : false;
      if (optionSelected) { // Action required
        console.log('Action Requried');
      }else{ // No action required
        console.log('No Action Requried');
      }
  }

  async infoAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Module not Available',
      message: 'The Signup module is currently not available. Please check back later.',
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [
        {
          text: 'Ok, Dismiss',
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
