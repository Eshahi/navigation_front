import React, {useEffect, useState} from 'react';
import InteractiveFloorMap from '../components/mapComponents/InteractiveFloorMap';
import RoomForm from '../components/roomComponents/RoomForm';
import { createFloor, getFloor, updateFloor, deleteFloor, createRoom, updateRoom, deleteRoom } from '../samples/samples';
import RoomDetailsModal from "../components/roomComponents/RoomEditModal";
import FloorForm from "../components/floorComponents/FloorForm";


//
// const sampleFloors = [
//     {
//         id: 1,
//         floor_number: 1,
//         description: "First floor with conference rooms and lobby",
//         rooms: [
//             { id: 101, name: "Conference Room A", capacity: 12, x: 100, y: 100, width: 150, height: 100 },
//             { id: 102, name: "Lobby", x: 300, y: 100, width: 200, height: 150 },
//             // Add more rooms with x, y, width, and height properties
//         ],
//     },
//     {
//         id: 2,
//         floor_number: 2,
//         description: "Second floor with offices",
//         rooms: [
//             { id: 201, name: "Office 201", capacity: 2, x: 100, y: 300, width: 150, height: 100 },
//             { id: 202, name: "Office 202", capacity: 2, x: 300, y: 300, width: 200, height: 150 },
//             // Add more rooms with x, y, width, and height properties
//         ],
//     },
// ]


const AdminPanel = () => {
    const [floors, setFloors] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null); // State for the room being edited
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        // Load floors from localStorage when the component mounts
        const loadedFloors = getFloor();
        if (loadedFloors && loadedFloors.length > 0) {
            setFloors(loadedFloors);
            setSelectedFloorId(loadedFloors[0].id); // Set the first floor as selected by default
        }
    }, []);

    const handleSelectFloor = (event) => {
        setSelectedFloorId(Number(event.target.value));
    };

    const handleAddRoom = (newRoom) => {
        createRoom(selectedFloorId, { ...newRoom, id: Math.random().toString(36).substr(2, 9) });
        // Reload the floors data to reflect the new room
        setFloors(getFloor());
    };

    const handleRoomClick = (roomId) => {
        console.log('Room clicked:', roomId);
        const room = selectedFloor.rooms.find(room => room.id === roomId);
        setSelectedRoom(room);
        setShowModal(true);    };
    const handleUpdateRoom = (updatedRoomData) => {
        updateRoom(selectedFloorId, updatedRoomData);
        setFloors(getFloor());
        setShowModal(false);
    };

    const handleDeleteRoom = (roomId) => {
        deleteRoom(selectedFloorId, roomId);
        setFloors(getFloor());
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const selectedFloor = floors.find((floor) => floor.id === selectedFloorId);

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
                        onRoomClick={handleRoomClick}
                    />
                    <FloorForm setFloors={setFloors}  />
                    <RoomForm onAddRoom={handleAddRoom} />
                    {showModal && selectedRoom && (
                        <RoomDetailsModal
                            room={selectedRoom}
                            onSave={handleUpdateRoom}
                            onDelete={handleDeleteRoom}
                            onClose={handleCloseModal}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AdminPanel;