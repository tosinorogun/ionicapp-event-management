import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ApiEndpoint } from '../../constants/Constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  localStorageData: any;
  logoutData: any;

  constructor(
    public restApi: RestService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.restApi.getLocalStorageData();
  }

  logout() {
    this.restApi.presentLoading('Signing out device...').then(() => {
      this.restApi.getRecord(ApiEndpoint.AUTH_LOGOUT, this.restApi.localStorageData.id).subscribe((res: any) => {
        this.logoutData = res.data;
      }, error => console.error(error));

      this.restApi.deleteLocalStorageData(ApiEndpoint.LOCAL_USERDATA); // Empty local storage
      this.restApi.deleteLocalStorageData(ApiEndpoint.LOCAL_TOUR); // Empty local storage
      this.restApi.deleteLocalStorageData(ApiEndpoint.LOCAL_TEMP); // Empty local storage
      this.loadingCtrl.dismiss(); // End Loading screen
      this.restApi.doNavigate('root', '/login');
    });
  }

}
