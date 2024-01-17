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
    const [isElevator, setIsElevator] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRoom({
            id: Date.now(),
            name: roomName,
            capacity: roomCapacity,
            x: 50,  // Default X position
            y: 50,  // Default Y position
            width: 100,  // Default width
            height: 100,  // Default height
            isElevator: isElevator,
        });
        setRoomName('');
        setRoomCapacity('');
        setIsElevator(false);
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

            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-2">Is Elevator?</span>
                    <input
                        type="checkbox"
                        checked={isElevator}
                        onChange={(e) => setIsElevator(e.target.checked)}
                        className="toggle toggle-accent"
                    />
                </label>
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

