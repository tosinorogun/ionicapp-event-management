import { Component, OnInit } from '@angular/core';
import { ApiEndpoint } from 'src/app/constants/Constants';
import { RestService } from 'src/app/services/rest.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ScanResultPage } from '../scan-result/scan-result.page';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanResponse: any;
  scanAllowed = false;
  scanActive = false;

  constructor(
    public restApi: RestService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.checkPermission();
  }

  getQrCodeData(id: any) {
    this.restApi.presentLoading('Please wait').then(() => {
      const param = id;
      this.restApi.getRecord(ApiEndpoint.SCAN_QRCODE, param).subscribe((res: any) => {
        this.loadingCtrl.dismiss();
        if (res.status === 1) {
          this.scanResponse = res.data;
          // console.log(this.scanResponse);
          this.openScanResult(this.scanResponse);
        } else {
          const action = 'Try again';
          const actionRole = 'scan';
          this.completeScanAlert(res.message, res.description, action, actionRole);
        }
      }, error => console.error(error));
    });
  }

  async checkPermission() {
    console.log('Check scanner permission');
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
        this.scanAllowed = true;
        BarcodeScanner.prepare(); // Prepare scanner to boost performance
      } else if (status.denied) {
        this.scanAllowed = false;
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
      console.log('Scan Allowed? ', this.scanAllowed);
    });
  }

  async startScanner() {
    if (this.scanAllowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        console.log(result.content);
        this.getQrCodeData(result.content);
      } else {
        // stop it
        console.log('Could not read QR Code');
        const msgHeader = 'Scan Error!';
        const msgBody = 'Sorry, we could not read the QRCode. Please position the camera directly on the QRCode and scan again.';
        const msgAction = 'Try again';
        const actionRole = 'scan';
        this.completeScanAlert(msgHeader, msgBody, msgAction, actionRole);
      }
    } else {
      console.log('Permission denied');
      const msgHeader = 'Permission Denied';
      let msgBody = 'Could not start scan because permission to your camera was not granted.';
      msgBody += '<br><br> Please change your Camera Settings to grant permission';
      const msgAction = 'Ok, I will';
      const actionRole = 'cancel';
      this.completeScanAlert(msgHeader, msgBody, msgAction, actionRole);
    }
  }

  async completeScanAlert(msgHeader: string, msgBody: string, action: string, actionRole: string) {
    const alert = await this.alertCtrl.create({
      header: msgHeader,
      message: msgBody,
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [
        {
          text: action,
          role: actionRole,
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    const optionSelected = (result.role === 'scan') ? true : false;
    if (optionSelected) { // Action required
      console.log('Scan new Code');
      this.startScanner();
    }else{ // No action required
      this.scanActive = false;
      console.log('Close Scanner');
    }
  }

  async openScanResult(data: any) {
    const modal = await this.modalCtrl.create({
      component: ScanResultPage,
      backdropDismiss: false,
      mode: 'ios',
      swipeToClose: false,
      animated: true,
      showBackdrop: true,
      componentProps: {
        postData: data
      }
    });

    modal.onDidDismiss().then(callbackData => {
      console.log('Callback Data: ', callbackData.data.action);
      this.startScanner();
      // if(callbackData.data.action === 'scan'){
      //   // this.reloadPage();
      // }
    });

    return await modal.present();
  }

  stopScanner() {
    console.log('Scan Stop attempt');
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  closePage() {
    this.restApi.doNavigate('root', 'tabs/home');
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
