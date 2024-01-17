import React, {useEffect, useState} from "react";
import {getFloors} from "./samples/samples";
import InteractiveFloorMap from "./components/mapComponents/InteractiveFloorMap";
import FloorDropDown from "./components/floorComponents/FloorDropDown";
const Home  = () => {
    const [floors, setFloors] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState(null);
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

    const handleFloorChange = (floorId) => {
        setSelectedFloorId(floorId);
    };

    const getSelectedFloorDescription = () => {
        const selectedFloor = floors.find(floor => floor.id === selectedFloorId);
        return selectedFloor ? selectedFloor.description : 'Select Floor';
    };

    return (
        <div className="mx-auto max-w-7xl p-4">



                <FloorDropDown
                    floors={floors}
                    getSelectedFloorDescription={getSelectedFloorDescription}
                    handleSelectFloor={handleFloorChange}
                />



                <InteractiveFloorMap
                    rooms={currentRooms}
                    isAdmin={false}
                />

            </div>


    );

}

export default Home;