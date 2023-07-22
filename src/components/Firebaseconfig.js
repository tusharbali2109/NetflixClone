
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDKS91jM7wpjbDPZuzUqRgTP3Kcz22rzVA",
  authDomain: "netflix-e4349.firebaseapp.com",
  projectId: "netflix-e4349",
  storageBucket: "netflix-e4349.appspot.com",
  messagingSenderId: "931112532397",
  appId: "1:931112532397:web:dbf6ca87f423b3977dc924",
  measurementId: "G-KVLK8EV71N",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebaseConfig };
