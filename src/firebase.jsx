import {initializeApp} from "firebase/app" ;

const firebaseConfig = {
  apiKey :"AIzaSyCDtGfgV6-Up0PeeSQPCewEEnAj8ASeS3Q",
  authDomain :  "pcellwebsite-7113a.firebaseapp.com",
  projectId: "pcellwebsite-7113a",
  storageBucket: "pcellwebsite-7113a.firebasestorage.app",
  messagingSenderId: "338900388076",
  appId: "1:338900388076:web:c54bc9d050587dd4c6bdc9",
  measurementId: "G-3MP4MSKJ0C",
  databaseURL :"https://pcellwebsite-7113a-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);