import { Component, OnInit, Input } from '@angular/core';

import { ApiEndpoint } from 'src/app/constants/Constants';
import { RestService } from 'src/app/services/rest.service';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.page.html',
  styleUrls: ['./scan-result.page.scss'],
})
export class ScanResultPage implements OnInit {
  @Input() postData: any;

  constructor(
    public restApi: RestService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  logAccessResult() {
    this.restApi.presentLoading('Please wait').then(()=>{
      const credentials = {
        inviteNo: this.postData.invite_no,
        accessType: this.postData.access_request_code
      };

      return new Promise(resolve => {
        this.restApi.postData(ApiEndpoint.LOG_SCAN_ENTRY, credentials).subscribe((res: any) => {
            if (res.status === 0) {
                this.loadingCtrl.dismiss();
                this.closeScanResult('error');
              }else{
                this.loadingCtrl.dismiss();
                this.closeScanResult('granted');
            }
          }, (err) => {
            console.error(err);
          });
      });

    });
  }

  closeScanResult(msg: any) {
    this.modalCtrl.dismiss({
      action: msg
    });
  }

}
