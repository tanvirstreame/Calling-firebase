import logo from './logo.svg';
import './App.css';
import { getToken } from "firebase/messaging";
import { firebaseMessaging } from './firebase';
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect, useState } from 'react';

function App() {
  const [incommingCall, setIncommingCall] = useState({});

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(firebaseMessaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      });
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    setIncommingCall(payload)
  });

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div className="App">
      {incommingCall?.notification?.title ?
        <div className={`modal ${incommingCall?.notification?.title ? 'modal-open' : ''}`}>
          <div className="modal-content">
            <div>
              <div>Calling</div>
              <div>{incommingCall?.notification?.title} is calling you</div>
            </div>
          </div>
        </div>
        :
        <></>
      }

    </div>
  );
}

export default App;
