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

  const checkClick = async (x, y, stuffToFind, imageName) => {
    const imageData = await getImageData(imageName);

    for (const stuff in imageData) {
      if (imageData[stuff].name === stuffToFind) {
        console.log(imageData[stuff]);
        console.log(
          x,
          y,
          imageData[stuff].coordinates.x,
          imageData[stuff].coordinates.y,
          imageData[stuff].offset.x,
          imageData[stuff].offset.y
        );
        if (
          Math.abs(x - imageData[stuff].coordinates.x) <
            imageData[stuff].offset.x &&
          Math.abs(y - imageData[stuff].coordinates.y) <
            imageData[stuff].offset.y
        ) {
          console.log(`${stuffToFind} found!`);
        }
      }
    }
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
    if (posX > img.width - 46) {
      optionsX = squareX - 124;
    }

    if (posY > img.height - 104) {
      optionsY = squareY - 104 + 46;
    }

    return { posX, posY, squareX, squareY, optionsX, optionsY };
  };

  return { getImageData, getCoordinates, checkClick };
};

// TODO: CREATE IMAGE FACTORY AND ADD ATTRIBUTES AND FUNCTIONS

export { Image };
