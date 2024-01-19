import React, { useEffect, useState } from "react";
import { getFloors } from "./samples/samples";
import InteractiveFloorMap from "./components/mapComponents/InteractiveFloorMap";
import FloorDropDown from "./components/floorComponents/FloorDropDown";
import GetPathStartAndEnd from "./components/pathComponents/GetPathStartAndEnd";

const Home = () => {
    const [floors, setFloors] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState(null);
    const [currentRooms, setCurrentRooms] = useState([]);
    const [startRoom, setStartRoom] = useState({ id: null, name: 'Not Selected', floorId: null });
    const [endRoom, setEndRoom] = useState({ id: null, name: 'Not Selected', floorId: null });

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

    const handleFloorChange = (floorId) => {
        setSelectedFloorId(floorId);
    };

    const getSelectedFloorDescription = () => {
        const selectedFloor = floors.find(floor => floor.id === selectedFloorId);
        return selectedFloor ? selectedFloor.description : 'Select Floor';
    };

    const handleRoomSelection = (setter, roomId) => {
        const room = currentRooms.find(room => room.id === roomId);
        if (room) {
            setter({ id: room.id, name: room.name, floorId: selectedFloorId });
        }
    };

    return (
        <div className="mx-auto max-w-7xl p-4 space-y-6">

            <FloorDropDown
                floors={floors}
                handleSelectFloor={handleFloorChange}
                getSelectedFloorDescription={getSelectedFloorDescription}
            />

            <div className="space-y-4">

                <GetPathStartAndEnd
                    setter={(roomId) => handleRoomSelection(setStartRoom, roomId)}
                    roomNode={startRoom}
                    currentRooms={currentRooms}
                />

                <GetPathStartAndEnd
                    setter={(roomId) => handleRoomSelection(setEndRoom, roomId)}
                    roomNode={endRoom}
                    currentRooms={currentRooms}
                />

                <div className="p-4 rounded shadow stats-container">
                    <h2 className="text-lg font-semibold">Selected Path</h2>
                    <p>Start Room: {startRoom.name}</p>
                    <p>End Room: {endRoom.name}</p>                </div>

            </div>

            <InteractiveFloorMap
                rooms={currentRooms}
            />

        </div>
    );
}

export default Home;
