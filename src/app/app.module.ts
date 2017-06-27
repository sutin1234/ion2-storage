import { UploaderPage } from './../pages/uploader/uploader';
import { IframePage } from './../pages/iframe/iframe';
import { CameraPage } from '../pages/camera/camera';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule} from 'angularfire2';
//import * as firebase from 'firebase';

export const config = {
  apiKey: "AIzaSyCxKNEANq9AmT27COgEl7epqjkDOiYzVgQ",
  authDomain: "ionic2-storage.firebaseapp.com",
  databaseURL: "https://ionic2-storage.firebaseio.com",
  storageBucket: "ionic2-storage.appspot.com",
  messagingSenderId: "138042418279"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPage,
    IframePage,
    UploaderPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPage,
    IframePage,
    UploaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
