import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiCredentials, ApiEndpoint } from '../constants/Constants';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  isLoggedIn: any;
  tourIsViewed: any;
  localStorageData: any;
  tourStatus: any;
  endPoint: string;
  qrCodeUrl: string;
  avatarUrl: any;
  tourImageUrl: any;
  logoutData: any;

  httpHeader = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('App-Key', ApiCredentials.APP_KEY)
  .set('App-Secret', ApiCredentials.APP_SECRET);

  constructor(
    private http: HttpClient,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    private route: Router,
  ) {
    this.init();
    this.endPoint = environment.apiUrl;
    this.qrCodeUrl = environment.qrCodeUrl;
    this.avatarUrl = environment.avatarUrl;
    this.tourImageUrl = environment.tourImageUrl;
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
    this.getLocalStorageData();
  }

  getCurrentPage() {
    return this.route.url;
  }

  async checkUserAuthentication() {
    this.storage.get(ApiEndpoint.LOCAL_USERDATA).then((res: any) => {
      this.isLoggedIn = (res === null) ? false : true;
      if (!this.isLoggedIn) {
        this.doNavigate('root', '/login');
      }
      // this.redirectUser();
    });
  }

  redirectUser() {
    this.storage.get(ApiEndpoint.LOCAL_TOUR).then((res: any) => {
      if (res === null) {
        this.tourIsViewed = false;
      } else {
        this.tourIsViewed = (res.status === true) ? true : false;
      }

      if (this.isLoggedIn === true) { // User is logged in
        if (this.tourIsViewed) { // User has viewed Tour
          this.doNavigate('root', '/tabs/home');
        } else { // User has NOT viewed Tour
          this.doNavigate('root', '/tour');
        }
      } else { // User is NOT logged in
        if (this.tourIsViewed) { // User has viewed Tour
          this.doNavigate('root', '/login');
        } else { // User has NOT viewed Tour
          this.doNavigate('root', '/tour');
        }
      }
    });
  }

  redirectIfAlreadyLoggedIn() {
    this.storage.get(ApiEndpoint.LOCAL_USERDATA).then((res: any) => {
      if (res !== null) {
        this.doNavigate('root', '/');
      }
    });
  }

  getLocalStorageData() {
    this.storage.get(ApiEndpoint.LOCAL_USERDATA).then((res: any) => {
      this.localStorageData = res;
    });
  }

  getTourStatusData() {
    this.storage.get(ApiEndpoint.LOCAL_TOUR).then((res: any) => {
      this.tourStatus = res;
    });
  }

  doNavigate(direction: any, destination: any) {
    if (direction === 'root') {
      this.navCtrl.navigateRoot(destination);
    } else {
      this.navCtrl.navigateForward(destination);
    }
    this.menuCtrl.close();
  }

  openExternalUrl(destination: any) {
    window.open(destination, '_system', 'location=yes');
  }

  validateEmail(email: any) {
    // eslint-disable-next-line max-len
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  async presentLoading(msg: any) {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      duration: 4000,
      mode: 'ios',
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    // await loading.present();
    return loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed with role:', role);
  }

  createLocalStorageData(storageColumn: any, storageValue: any) {
    this.storage.set(storageColumn, storageValue).then(() => {
    });
  }

  deleteLocalStorageData(storageColumn: any) {
    this.storage.remove(storageColumn).then(() => {
    });
  }

  createRecord(url: string, credentials: any): Observable<any> {
    return this.http.post<any>(this.endPoint + url, credentials, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError<any>('Record created'))
      );
  }

  postData(url: string, credentials: any): Observable<any> {
    return this.http.post<any>(this.endPoint + url, credentials, { headers: this.httpHeader })
      .pipe(
        catchError(this.handleError<any>('Data Posted'))
      );
  }

  getRecord(url: string, id: any): Observable<any> {
    return this.http.get<any>(this.endPoint + url + id, { headers: this.httpHeader })
      .pipe(
        tap(_ => console.log(`GET Parameter: ${id}`)),
        catchError(this.handleError<any>(`Get one id=${id}`))
      );
  }

  getRecords(url: string): Observable<any> {
    // console.log(this.endPoint + url);
    return this.http.get<any>(this.endPoint + url, { headers: this.httpHeader })
      .pipe(
        tap(() => console.log('GET Parameter: List')),
        catchError(this.handleError<any>('Get all', []))
      );
  }

  updateRecord(url: string, id: any, credentials: any): Observable<any> {
    return this.http.put(this.endPoint + url + id, credentials, { headers: this.httpHeader })
      .pipe(
        tap(_ => console.log(`Record updated: ${id}`)),
        catchError(this.handleError<any>('Update Record'))
      );
  }

  deleteRecord(url: string, id: any): Observable<any> {
    return this.http.delete<any>(this.endPoint + url + id, { headers: this.httpHeader })
      .pipe(
        tap(_ => console.log(`Record deleted: ${id}`)),
        catchError(this.handleError<any>('Delete Record'))
      );
  }

  minutesToHours(minutes: any) {
    const hours = Math.floor(minutes/60);
    const minutesLeft = minutes % 60;
    const display = {
      hrs: hours,
      min: minutesLeft
    };
    return display;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
