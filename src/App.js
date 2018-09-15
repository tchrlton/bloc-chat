import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCW2ld6Lbc5iZQXr_Psxa99nla9Nyt0IFI",
  authDomain: "bloc-chat-f45b6.firebaseapp.com",
  databaseURL: "https://bloc-chat-f45b6.firebaseio.com",
  projectId: "bloc-chat-f45b6",
  storageBucket: "bloc-chat-f45b6.appspot.com",
  messagingSenderId: "856946608118"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
