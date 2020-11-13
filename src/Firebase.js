import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCiF1eQe4KcgnAX-PplPJ3MOEnS36hyw6w",
    authDomain: "olx-clone-dcdca.firebaseapp.com",
    databaseURL: "https://olx-clone-dcdca.firebaseio.com",
    projectId: "olx-clone-dcdca",
    storageBucket: "olx-clone-dcdca.appspot.com",
    messagingSenderId: "223385832299",
    appId: "1:223385832299:web:758986d11735a6ab491a2e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;


