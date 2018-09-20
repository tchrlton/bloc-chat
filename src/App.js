import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  this.state = {activeRoom: ""};
  this.activeRoom = this.activeRoom.bind(this);
 }

 activeRoom(room) {
   this.setState({ activeRoom: room })
 }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        {showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
        : (null)
        }
      </div>
    );
  }
}

export default App;
