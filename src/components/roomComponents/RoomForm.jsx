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


const RoomForm = ({ addRoom, floorId }) => {
    const [roomName, setRoomName] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new room object
        const newRoom = {
            id: Date.now(), // Temporary unique ID until backend integration
            name: roomName,
            capacity: parseInt(capacity, 10) // Parse capacity to ensure it's an integer
        };

        // Add the new room to the specific floor
        addRoom(newRoom, floorId);

        // Reset form fields
        setRoomName('');
        setCapacity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                placeholder="Room Name"
                required
            />
            <input
                type="number"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                placeholder="Capacity"
                required
            />
            <button type="submit">Add Room</button>
        </form>
    );
};
export default RoomForm;
