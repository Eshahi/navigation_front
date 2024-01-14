import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomForm from '../floorComponents/FloorForm';

// const RoomList = ({ floorId }) => {
//     const [rooms, setRooms] = useState([]);
//
//     useEffect(() => {
//         axios.get(`/api/floors/${floorId}/rooms`)
//             .then(response => setRooms(response.data))
//             .catch(error => console.error('Error fetching rooms', error));
//     }, [floorId]);
//
//     const handleDeleteRoom = (roomId) => {
//         axios.delete(`/api/rooms/${roomId}`)
//             .then(() => {
//                 // Remove the room from the rooms state
//                 setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
//             })
//             .catch(error => console.error('Error deleting room', error));
//     };
//
//     return (
//         <div>
//             <h3>Rooms in Floor {floorId}</h3>
//             {rooms.map(room => (
//                 <div key={room.id}>
//                     {room.name}
//                     <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                 </div>
//             ))}
//             <RoomForm floorId={floorId} setRooms={setRooms} />
//         </div>
//     );
// };


const RoomList = ({ rooms }) => {
    return (
        <div>
            {rooms.map(room => (
                <div key={room.id}>
                    {room.name} (Capacity: {room.capacity || 'N/A'})
                </div>
            ))}
        </div>
    );
};

export default RoomList;

