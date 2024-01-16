import React, { useState, useEffect } from 'react';
import InteractiveFloorMap from '../components/mapComponents/InteractiveFloorMap';
import RoomForm from '../components/roomComponents/RoomForm';
import RoomDetailsModal from '../components/roomComponents/RoomEditModal';
import FloorForm from '../components/floorComponents/FloorForm';
import {
    createFloor,
    getFloors,
    updateFloor,
    deleteFloor,
    createRoom,
    updateRoom,
    deleteRoom,
    getRooms
} from '../samples/samples';

const AdminPanel = () => {
    const [floors, setFloors] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editRooms, setEditRooms] = useState(false);
    const [currentRooms, setCurrentRooms] = useState([]);

    useEffect(() => {
        const loadedFloors = getFloors();
        setFloors(loadedFloors);
        if (loadedFloors.length > 0) {
            setSelectedFloorId(loadedFloors[0].id);
            setCurrentRooms(loadedFloors[0].rooms);
        }
    }, []);

    useEffect(() => {
        const selectedFloor = floors.find(floor => floor.id === selectedFloorId);
        if (selectedFloor) {
            setCurrentRooms(selectedFloor.rooms);
        }
    }, [selectedFloorId, floors]);

    const handleSelectFloor = (event) => {
        setSelectedFloorId(Number(event.target.value));
        setEditRooms(false);
    };

    const handleAddFloor = (newFloor) => {
        createFloor(newFloor);
        const updatedFloors = getFloors();
        setFloors(updatedFloors);
        setSelectedFloorId(newFloor.id);
    };

    const handleEditRooms = () => {
        setEditRooms(!editRooms);
    };

    const handleAddRoom = (newRoom) => {
        if (selectedFloorId) {
            createRoom(selectedFloorId, {...newRoom, id: Date.now()}
        )
            console.log(getRooms(selectedFloorId))

            ;
            const updatedFloors = getFloors();
            setFloors(updatedFloors);
            // Update the currentRooms state to reflect the new room addition
            const updatedFloor = updatedFloors.find(floor => floor.id === selectedFloorId);
            if (updatedFloor) {
                setCurrentRooms(updatedFloor.rooms);
            }
        }
    };

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleUpdateRoom = (updatedRoom) => {
        if (selectedFloorId) {
            updateRoom(selectedFloorId, updatedRoom);
            const updatedFloors = getFloors();
            setFloors(updatedFloors);

            // Update the currentRooms state to reflect the room update
            const updatedFloor = updatedFloors.find(floor => floor.id === selectedFloorId);
            if (updatedFloor) {
                setCurrentRooms(updatedFloor.rooms);
            }
            setShowModal(false);
        }
    };

    const handleDeleteRoom = (roomId) => {
        if (selectedFloorId) {
            deleteRoom(selectedFloorId, roomId);
            const updatedFloors = getFloors();
            setFloors(updatedFloors);

            // Update the currentRooms state to reflect the room deletion
            const updatedFloor = updatedFloors.find(floor => floor.id === selectedFloorId);
            if (updatedFloor) {
                setCurrentRooms(updatedFloor.rooms);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const selectedFloor = floors.find(floor => floor.id === selectedFloorId);

    return (
        <div>
            <select onChange={handleSelectFloor} value={selectedFloorId || ''}>
                {floors.map(floor => (
                    <option key={floor.id} value={floor.id}>{floor.description}</option>
                ))}
            </select>
            <FloorForm onAddFloor={handleAddFloor}/>

            {selectedFloor && (
                <>
                    <button onClick={handleEditRooms}>
                        {editRooms ? 'Stop Editing Rooms' : 'Edit Rooms'}
                    </button>
                    {editRooms && (
                        <>
                            <RoomForm onAddRoom={handleAddRoom}/>
                            <InteractiveFloorMap
                                rooms={currentRooms}
                                onRoomSelect={handleRoomSelect}
                            />

                        </>
                    )}
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