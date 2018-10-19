import React, { Component } from 'react';
import './MessageList.css';


class RoomList extends Component {
    constructor(props) {
        super(props);

         this.state = {
            title: "",
            creator: "",
            rooms: [],
            toEdit: ""
        };
        
         this.roomsRef = this.props.firebase.database().ref('rooms');
         this.handleChange = this.handleChange.bind(this);
         this.createRoom = this.createRoom.bind(this);
         this.editRoom = this.editRoom.bind(this);
         this.updateRoom = this.updateRoom.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        //Check the state to see if creator is undefined
        JSON.stringify(this.state);
        this.setState({
            title: e.target.value, 
            creator: this.props.user
        });
    }

    createRoom(e) {
        e.preventDefault();
        this.roomsRef.push({
            title: this.state.title,
            creator: this.props.user 
        });
        this.setState({ title: "", creator: "" });
    }

    deleteRoom(roomKey) {
      let room = this.props.firebase.database().ref("rooms/" + roomKey);
      room.remove();
    }

    editRoom(room) {
        const editRoom = (
            <form onSubmit={this.updateRoom}>
              <input type="text" defaultValue={room.title} ref={(input) => this.input = input}/>
              <input type="submit" value="Update" />
              <button type="button" onClick={() => this.setState({toEdit: ""})}>Cancel</button>
            </form>
        );
        return editRoom;
    }

    updateRoom(e) {
        e.preventDefault();
        const updates = {[this.state.toEdit + "/title"]: this.input.value};
        this.roomsRef.update(updates);
        this.setState({ toEdit: ""});
    }

    componentDidMount() {
        this.roomsRef.on('value', snapshot => {
          let roomChanges = [];
          snapshot.forEach((room) => {
            roomChanges.push({
              key: room.key,
              title: room.val().title,
              creator: room.val().creator
            });
          });
          this.setState({ rooms: roomChanges})
        });
    }

    selectRoom(room) {
        this.props.activeRoom(room);
    }


    render() {
     const roomForm = (
         <form onSubmit={this.createRoom}>
           <input type="text" value={this.state.title} placeholder="Enter Room Name" onChange={this.handleChange}/>
           <input type="submit" value="Create"/>
         </form>
     );

     const roomList = this.state.rooms.map((room) =>
      <li className="list-unstyled text-center room-list" key={room.key}>
        {this.state.toEdit === room.key ?
          this.editRoom(room)
        :
        <div>
          <h4 onClick={(e) => this.selectRoom(room, e)}>{room.title}</h4>
          {this.props.user === room.creator ?
            <div>
              <button onClick={() => this.deleteRoom(room.key)}>Remove</button>
              <button onClick={() => this.setState({toEdit: room.key})}>Edit</button>
            </div>
          : null
          }
        </div>
        }
      </li>
     );
    
      return (
          <div>
           <div>{roomForm}</div>
           <ul>{roomList}</ul>
          </div>
      );
    }
}

export default RoomList;