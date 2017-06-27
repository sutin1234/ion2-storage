import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  base64Image:any;
  storageRef = firebase.storage().ref();
  tbPostRef: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire,public zone:NgZone) {
    this.tbPostRef = af.database.list("tb_post/");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
    /*
    this.storageRef.child("images/1491234331652.jpg").getDownloadURL().then((url)=>{
      this.zone.run(()=>{
        this.base64Image = url;
      });
      
    });
    */
  }

  TakePhoto(){
      let options: CameraOptions = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true
      }
      Camera.getPicture(options).then((_imageBase64) => {
        this.base64Image = "data:image/jpeg;base64,"+_imageBase64;
        alert(this.base64Image);
        /*
        let taskUpload = this.storageRef.child("images/"+new Date().getTime()+".jpg").putString(_imageBase64,'base64');
        taskUpload.then(()=>{
          alert("Upload Photo "+new Date().getTime()+".jpg to storage Success!");
        });
        */
      });
  }

  onUploadPhoto(){
    this.tbPostRef.push({
      id: Math.floor(Date.now()),
      photo: this.base64Image,
      created: Date.now()
    }).then((res)=>{
      alert(res);
    }).catch((err)=>{
      alert(JSON.stringify(err));
    });
  }

}
