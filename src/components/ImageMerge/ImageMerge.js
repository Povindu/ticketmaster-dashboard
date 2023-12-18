
import React, {useState} from 'react';
import mergeImages from 'merge-images';
import coverImage from '../../assets/CoverImage.png';
import T001 from '../../assets/T002.png';

import firebase from "firebase/app";
import 'firebase/storage'

// import {storage, app} from "../../config/config"

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtfQ5xc7Wu5C7kqfDi3XTjnYa0mi_Yzdc",
  authDomain: "nilwalaticketmaster.firebaseapp.com",
  projectId: "nilwalaticketmaster",
  storageBucket: "nilwalaticketmaster.appspot.com",
  messagingSenderId: "506710078840",
  appId: "1:506710078840:web:0da77973c381513c0c448d",
  databaseURL: 'https://nilwalaticketmaster-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);





const ImageMerge = () => {

  const [img64, setImg64] = useState(null);
 
  mergeImages([
    {src:coverImage},
    {src:T001, width:'80px' , height:'80px'}])
  .then(b64 => setImg64(b64)
  );    

  // document.querySelector('img').src = b64,
  const uploadImage = () => {
  const fileName = "test"
  const storageRef = ref(storage, `/files/${fileName}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.

    // firebase.storageRef('/images').child('ticket01')
    //   .putString(img64, 'base64', {contentType:'image/jpg'});

    firebase.storage().ref('/images').child('file_name')
    .putString(img64, 'base64', {contentType:'image/jpg'});
  }

    
return (
    <div>
        <img src="" alt="test" />
        <button onClick={uploadImage}>Upload</button>
    </div>
  );
};

export default ImageMerge;
