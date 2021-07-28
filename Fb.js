import React, {Component} from 'react';
import * as firebase from 'firebase';


const firebaseConfig =  {
    apiKey: "AAAAs_WK2uU:APA91bHcjRYUKhFoPHi7wi2mXRqHGElxuMfeMn2zCiKQRlxkKJLYGu9xxSzt0PfaNFcvNbNX4nh2nOEnCKbVi5hamyOMm17fsullEkzv0Gw-Ph0LGfKLBz0EVc4iIWMJLNe11PpTg_Bd",
    authDomain: "test-a8fc6.firebaseapp.com",
    databaseURL: "https://test-a8fc6-default-rtdb.firebaseio.com",
    storageBucket: "test-a8fc6.appspot.com"
  };

  const app = firebase.initializeApp(firebaseConfig);
  export const db = app.database();


