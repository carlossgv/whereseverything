// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3uPXT4bQfZjx6VxEuHMyTBnLWNZVvCg8',
  authDomain: 'whereswaldo-carlossgv.firebaseapp.com',
  projectId: 'whereswaldo-carlossgv',
  storageBucket: 'whereswaldo-carlossgv.appspot.com',
  messagingSenderId: '801911005832',
  appId: '1:801911005832:web:fb56b311520a4c0e8bf53d',
  measurementId: 'G-DEC45V2ZP2',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

const getImageInfo = (imageName) => {
  var image = db.collection('images').doc(imageName);

  let imageData = image
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  return imageData;
};

const checkClick = async (x, y, stuffToFind, imageName) => {
  const imageData = await getImageInfo(imageName);

  for (const stuff in imageData) {
    if (imageData[stuff].name === stuffToFind) {
      console.log(stuffToFind);
    }
  }
};

export { getImageInfo, checkClick };
