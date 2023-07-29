import { Component, OnInit } from '@angular/core';
import { ApiEndpoint } from 'src/app/constants/Constants';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {
  pageData: any;
  storageData: any;
  userId: any;

  constructor(
    public restApi: RestService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.getLocalData();
  }

  getLocalData() {
    this.restApi.storage.get(ApiEndpoint.LOCAL_USERDATA).then((res: any) => {
      this.storageData = res;
      this.userId = res.id;
      this.getPageData(res.id);
    });
  }

  getPageData(id: any) {
    this.restApi.presentLoading('Please wait').then(() => {
      const param = this.userId;
      this.restApi.getRecord(ApiEndpoint.ARRIVED_GUEST, param).subscribe((res: any) => {
        console.log(res);
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
