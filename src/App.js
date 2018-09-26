import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
 constructor(props) {
  super(props);
  this.state = {activeRoom: "", user: null};
  this.activeRoom = this.activeRoom.bind(this);
  this.setUser = this.setUser.bind(this);
 }

 activeRoom(room) {
   console.log(room);
   this.setState({ activeRoom: room });
 }

 setUser(user) {
   console.log(user);
   this.setState({ user: user});
 }

  render() {
    const showMessages = this.state.activeRoom;
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <User firebase={firebase} setUser={this.setUser} welcome={currentUser} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        {showMessages ?
         (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={currentUser} />)
        : null
        }
      </div>
    );
  }
}

export default App;
