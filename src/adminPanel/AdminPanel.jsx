import React, { useState } from 'react';
import InteractiveFloorMap from '../components/mapComponents/InteractiveFloorMap';
import RoomForm from '../components/roomComponents/RoomForm';
import sampleFloors from '../samples/sampleFloors';

const AdminPanel = () => {
    const [floors, setFloors] = useState(sampleFloors);
    const [selectedFloorId, setSelectedFloorId] = useState(sampleFloors[0]?.id);
    const selectedFloor = floors.find((floor) => floor.id === selectedFloorId);

    const handleSelectFloor = (event) => {
        setSelectedFloorId(Number(event.target.value));
    };

    const handleAddRoom = (newRoom) => {
        const updatedFloors = floors.map((floor) => {
            if (floor.id === selectedFloorId) {
                return { ...floor, rooms: [...floor.rooms, { ...newRoom, id: Math.random().toString(36).substr(2, 9) }] };
            }
            return floor;
        });
        setFloors(updatedFloors);
    };

    const handleRoomClick = (roomId) => {
        console.log('Room clicked:', roomId);
        // Implement logic for
        // room modification or deletion here.
    };


    return (
        <div>
            <select onChange={handleSelectFloor} value={selectedFloorId || ''}>
                {floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                        {floor.description}
                    </option>
                ))}
            </select>
            {selectedFloor && (
                <>
                    <InteractiveFloorMap
                        rooms={selectedFloor.rooms}
                        setRooms={(updatedRooms) => {
                            const updatedFloors = floors.map((floor) => {
                                if (floor.id === selectedFloorId) {
                                    return { ...floor, rooms: updatedRooms };
                                }
                                return floor;
                            });
                            setFloors(updatedFloors);
                        }}
                        onRoomClick={handleRoomClick}
                    />
                    <RoomForm onAddRoom={handleAddRoom} />
                </>
            )}
        </div>
    );
};

export default AdminPanel;