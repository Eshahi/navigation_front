// RoomForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// const RoomForm = ({ floorId, setRooms }) => {
//     const [roomName, setRoomName] = useState('');
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post(`/api/floors/${floorId}/rooms`, { name: roomName })
//             .then(response => {
//                 // Update the rooms state with the new room
//                 setRooms(prevRooms => [...prevRooms, response.data]);
//                 setRoomName(''); // Reset the form
//             })
//             .catch(error => console.error('Error creating room', error));
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Room Name:
//                 <input
//                     type="text"
//                     value={roomName}
//                     onChange={(e) => setRoomName(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Add Room</button>
//         </form>
//     );
// };



// RoomForm.jsx


const RoomForm = ({ onAddRoom }) => {
    const [roomName, setRoomName] = useState('');
    const [roomCapacity, setRoomCapacity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You'd also want to generate a unique ID for the new room
        onAddRoom({
            id: Date.now(), // simplistic unique ID generator
            name: roomName,
            capacity: roomCapacity,
            // Add other room attributes here
        });
        setRoomName('');
        setRoomCapacity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room Name"
                required
            />
            <input
                type="number"
                value={roomCapacity}
                onChange={(e) => setRoomCapacity(e.target.value)}
                placeholder="Capacity"
                required
            />
            <button type="submit">Add Room</button>
        </form>
    );
};

export default RoomForm;

