// FloorList.jsx
import React, {useEffect, useState} from 'react';
import FloorForm from '../floorComponents/FloorForm';
import RoomList from '../roomComponents/RoomList';
import { createFloor, getFloor, updateFloor, deleteFloor, createRoom, updateRoom, deleteRoom } from '../../samples/samples';
``

const FloorList = () => {
    // Since sampleFloors is a function, we need to call it to get the array
    const [floors, setFloors] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);

    useEffect(() => {
        // Load floors from localStorage when the component mounts
        const loadedFloors = getFloor();
        if (loadedFloors) {
            setFloors(loadedFloors);
        }
    }, []);

    const handleSelectFloor = (floorId) => {
        // Find the selected floor based on floorId
        const floor = floors.find(f => f.id === floorId);
        setSelectedFloor(floor);
    };
    const handleCreateFloor = (newFloorData) => {
        createFloor(newFloorData);
        // Reload floors data to reflect the new floor
        setFloors(getFloor());
    };
    return (
        <div>
            <h2>Floors</h2>
            {floors.map(floor => (
                <div key={floor.id} onClick={() => handleSelectFloor(floor.id)}>
                    <h3>Floor {floor.floor_number}</h3>
                    <p>{floor.description}</p>
                    {selectedFloor && selectedFloor.id === floor.id && (
                        <RoomList rooms={selectedFloor.rooms} />
                    )}
                </div>
            ))}
            <FloorForm onCreateFloor={setFloors} />
        </div>
    );
};

export default FloorList;
