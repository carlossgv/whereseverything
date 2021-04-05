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

const Image = (imageName) => {
  const name = imageName;

  const getImageData = (imageName) => {
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

  const checkClick = (x, y, stuffToFind, imageData) => {
    for (const stuff in imageData) {
      if (imageData[stuff].name === stuffToFind) {
        if (
          Math.abs(x - imageData[stuff].coordinates.x) <
            imageData[stuff].offset.x &&
          Math.abs(y - imageData[stuff].coordinates.y) <
            imageData[stuff].offset.y
        ) {
          imageData[stuff].isLocated = true;
        }
      }
    }
    console.log(imageData);

    return imageData;
  };

  const checkIsFinished = (optionsArray) => {
    for (const stuff in optionsArray) {
      if (!optionsArray[stuff].isLocated) {
        return false;
      }
    }
    return true;
  };

  const getCoordinates = (e, img) => {
    let posX = e.offsetX ? e.offsetX : e.pageX - img.offsetLeft;
    let posY = e.offsetY ? e.offsetY : e.pageY - img.offsetTop;
    let squareX = '';
    let squareY = '';
    let optionsX = '';
    let optionsY = '';

    // square position rules
    if (posX > img.width - 23) {
      squareX = img.width - 47 + img.offsetLeft;
    } else if (posX < 46) {
      squareX = img.offsetLeft;
      optionsX = squareX + 50;
    } else {
      squareX = posX - 20 + img.offsetLeft;
      optionsX = squareX + 50;
    }

    if (posY > img.height - 23) {
      squareY = img.height - 47 + img.offsetTop;
    } else if (posY < 46) {
      squareY = img.offsetTop;
      optionsY = img.offsetTop;
    } else {
      squareY = posY - 20 + img.offsetTop;
      optionsY = squareY;
    }

    // option list position rules
    if (posX > img.width - 170) {
      optionsX = squareX - 124;
    }

    if (posY > img.height - 104) {
      optionsY = squareY - 104 + 46;
    }

    return { posX, posY, squareX, squareY, optionsX, optionsY };
  };

  return { name, getImageData, getCoordinates, checkClick, checkIsFinished };
};

// Cookies functions from W3 School https://www.w3schools.com/js/js_cookies.asp
function setCookie(cid, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cid + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cid) {
  var name = cid + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function checkCookie(imageName, time) {
  var id = getCookie('id');
  console.log(id, imageName, time);

  if (id !== '') {
    var docRef = db.collection('users').doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());

          let name = doc.data().name;
          let scores = doc.data().scores;

          if (time < scores[imageName]) {
            scores[imageName] = time;
            console.log('new record!');
          }

          db.collection('users')
            .doc(id)
            .set({
              name: name,
              scores,
            })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    // Add a new document in collection "users"
  } else {
    const name = prompt('Please enter your name:', '');
    let scores = {};
    scores[imageName] = time;

    // Add a new document with a generated id.
    db.collection('users')
      .add({
        name: name,
        scores,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setCookie('id', docRef.id, 365);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}

export { Image, setCookie, getCookie, checkCookie };
