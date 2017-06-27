import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-uploader',
  templateUrl: 'uploader.html'
})
export class UploaderPage {
  
  files: any;
  tb_post: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    this.tb_post = af.database.list("tb_post/");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploaderPage');
  }

  isSelected(e){
    let files:any = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e:any) => {
      this.files = e.target.result;
      if(this.files){
        this.uploadImage(this.files);
      }
    }
    reader.readAsDataURL(files);
  }

  uploadImage(imageBase64){
    this.tb_post.push({
      id: Date.now(),
      name: 'new_image-'+Date.now()+'.png',
      photo: imageBase64
    }).then((data)=>{
      alert("upload image success");
    });
  }

}
