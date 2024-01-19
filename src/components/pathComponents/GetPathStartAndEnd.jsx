import React from "react";

const GetPathStartAndEnd = ({ setter, roomNodeId, currentRooms }) => {
    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        const selectedRoom = currentRooms.find(room => room.id === parseInt(roomId));
        setter(selectedRoom ? selectedRoom.id : null);

    };

    return (
        <div className="form-control">
            <select className="select select-bordered" value={roomNodeId || ''} onChange={handleRoomChange}>
                <option value="">Select a room</option>
                {currentRooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </select>
        </div>
    );
};
export default GetPathStartAndEnd;