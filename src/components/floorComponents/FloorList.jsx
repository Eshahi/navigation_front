// FloorList.jsx
import React, { useState } from 'react';
import sampleFloors from '../../samples/sampleFloors'; // Make sure the path to your sample data is correct
import FloorForm from '../floorComponents/FloorForm';
import RoomList from '../roomComponents/RoomList';

const FloorList = () => {
    // Since sampleFloors is a function, we need to call it to get the array
    const [floors, setFloors] = useState(sampleFloors());
    const [selectedFloor, setSelectedFloor] = useState(null);

    const handleSelectFloor = (floorId) => {
        // Find the selected floor based on floorId
        const floor = floors.find(f => f.id === floorId);
        setSelectedFloor(floor);
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
            <FloorForm setFloors={setFloors} />
        </div>
    );
};

export default FloorList;
