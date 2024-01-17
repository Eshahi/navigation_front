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
    getRooms, clearStorage
} from '../samples/samples';
import FloorDropDown from "../components/floorComponents/FloorDropDown";

const AdminPanel = () => {
    const [floors, setFloors] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [editRooms, setEditRooms] = useState(false);
    const [currentRooms, setCurrentRooms] = useState([]);
    const [newRoomToAdd, setNewRoomToAdd] = useState(null);
    const [showModal,setShowModal] = useState(false);

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

    useEffect(() => {
        if (newRoomToAdd) {
            createRoom(selectedFloorId, newRoomToAdd);
            setCurrentRooms(prevRooms => [...prevRooms, newRoomToAdd]);
            setNewRoomToAdd(null); // Reset new room to be added
        }
    }, [newRoomToAdd, selectedFloorId]);

    const handleSelectFloor = (floorId) => {
        setSelectedFloorId(floorId);

        const selectedFloor = floors.find(f => f.id === floorId);

        setCurrentRooms(selectedFloor.rooms);


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
            const newRoomWithId = {...newRoom, id: Date.now()};
            setNewRoomToAdd(newRoomWithId); // Set new room to be added
        }
    };



    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
        console.log('Room selected:', room); // This should log when a room is clicked

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
    const getSelectedFloorDescription = () => {
        const selectedFloor = floors.find(floor => floor.id === selectedFloorId);
        return selectedFloor ? selectedFloor.description : 'Select Floor';
    };

    const selectedFloor = floors.find(floor => floor.id === selectedFloorId);

    return (
        <>

            <div className="container mx-auto max-w-7xl p-4">

                {/* Dropdown & FloorForm */}
                <div className="flex flex-col sm:flex-row sm:justify-between mb-5">
                    <div className="flex items-center sm:mb-0 mb-4">
                        <FloorDropDown getSelectedFloorDescription={getSelectedFloorDescription}
                                        handleSelectFloor={handleSelectFloor}
                                        floors={floors}/>

                        <FloorForm
                            className="btn-primary btn ml-4"
                            onAddFloor={handleAddFloor}
                        />
                    </div>

                    {/* Edit Rooms Button */}
                    {selectedFloor && (
                        <button
                            className="btn btn-primary btn-accent m-4"
                            onClick={handleEditRooms}
                        >
                            {editRooms ? 'Stop Editing' : 'Edit Rooms'}
                        </button>
                    )}
                </div>

                {/* Room Form & Map */}
                {editRooms && selectedFloor && (
                    <div className="flex flex-row">

                        <div className="flex flex-col w-96">

                            <RoomForm
                                onAddRoom={handleAddRoom}
                            />

                            {selectedRoom && showModal &&
                                <RoomDetailsModal
                                    room={selectedRoom}
                                    onSave={handleUpdateRoom}
                                    onClose={handleCloseModal}
                                    onDelete={handleDeleteRoom}
                                />
                            }

                        </div>

                        <InteractiveFloorMap
                            className="mx-8"
                            rooms={currentRooms}
                            onRoomSelect={handleRoomSelect}
                            isAdmin={true}
                        />

                    </div>
                )}

            </div>
        </> );
};
export default AdminPanel;