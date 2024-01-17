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
            x: 50, // Default x-coordinate
            y: 50, // Default y-coordinate
            width: 100, // Default width
            height: 100, // Default height



        });
        setRoomName('');
        setRoomCapacity('');
    };
    return (
        <form
            className="w-96 mx-auto p-8 bg-base-200 rounded-box"
            onSubmit={handleSubmit}
        >

            <div className="form-control">
                <input
                    type="text"
                    className="input input-bordered"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Room Name"
                    required
                />
            </div>

            <div className="form-control">
                <input
                    type="number"
                    className="input input-bordered"
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
                    placeholder="Capacity"
                    required
                />
            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                    Add Room
                </button>
            </div>

        </form>
    );
};



export default RoomForm;

