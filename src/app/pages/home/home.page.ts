import { Component, OnInit } from '@angular/core';
import { ApiEndpoint } from 'src/app/constants/Constants';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pageData: any;
  storageData: any;
  userId: any;
  firstname: any;
  lastname: any;

  constructor(
    public restApi: RestService,
    private loadingCtrl: LoadingController
  ) {  }

  ngOnInit() {
    this.restApi.checkUserAuthentication();
    this.getLocalData();
  }

  getLocalData() {
    this.restApi.storage.get(ApiEndpoint.LOCAL_USERDATA).then((res: any) => {
      this.storageData = res;
      this.userId = res.id;
      this.getPageData(res.id);
      this.firstname = res.firstname;
      this.lastname = res.lastname;
    });
  }

  getPageData(id: any) {
    this.restApi.presentLoading('Please wait').then(() => {
      const param = id;
      this.restApi.getRecord(ApiEndpoint.DASHBOARD, param).subscribe((res: any) => {
        this.loadingCtrl.dismiss();
        if (res.status === 1) {
          this.pageData = res.data;
          console.log(this.pageData);
        } else {
          console.log(res);
        }
      }, error => console.error(error));
    });
  }

  doRefresh(event: any) {
    this.getLocalData();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
