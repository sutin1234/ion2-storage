import { Component,NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  storageRef = firebase.storage().ref();
  image:any;
  file:any;
  progress:any;
  uploaded:any;
  totalByte:any;
  imageUrl:any;


  constructor(public navCtrl: NavController, public af: AngularFire,public zone:NgZone,public dom:DomSanitizer) {
    /*
    this.storageRef.child("images/1491071770884.jpg").getDownloadURL().then((url)=> {
      this.zone.run(()=> {
        console.log(url);
         this.image = url;
      });
     
    });
    */
    
  }

  selectFile(e){
    this.file = e.target.files[0];
    this.readPhoto(this.file);
  }

  startUpload(){
    this.storageRef.child("images/"+this.file.name).put(this.file).then((snapshot)=>{
      alert("upload "+ this.file.name +" success!");
    }); 
  }

  readPhoto(file){
    let reader = new FileReader();
    reader.onload = (e) =>{
      this.zone.run(()=>{
        let path:any = e.target;
        this.image = path.result;
      });
      
    }
    reader.readAsDataURL(file);
  }

  uploadProgressbar(){
    let fileSelected = this.file;
    let taskUpload = this.storageRef.child("images/"+fileSelected.name).put(fileSelected);
    taskUpload.then((sanpshot)=>{
      alert("Uploaded file: "+fileSelected.name+" Completed!");
    });
    taskUpload.on("state_changed",(snapshot)=>{
      this.zone.run(()=>{
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        this.progress = Math.round(progress).toFixed(0);
        this.uploaded = (Math.round(snapshot.bytesTransferred)/1000).toFixed(0);
        this.totalByte = (Math.round(snapshot.totalBytes)/1000).toFixed(0);
      });
    });
  }

  onChange(url){
    this.zone.run(()=>{
      this.imageUrl = url.value;
      this.createImageFileFromUrl(url.value,(file)=>{
       let taskUpload = this.storageRef.child("images/"+file.name).put(file);
       taskUpload.then((snapshot)=>{
        alert("upload file "+file.name+" success!");
       });
      });
    });
  }

  createImageFileFromUrl(url,callback){
    let xhr = new XMLHttpRequest();
    xhr.onload = (e)=>{
      let blob = new Blob([xhr.response],{type:"image/jpg"});
      let file = new File([blob],new Date().getTime()+".jpg");
      callback(file);
    }
    xhr.responseType = "arraybuffer";
    xhr.open("GET",url,true);
    xhr.send();
  }

    
}

