import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const InteractiveFloorMap = ({ rooms, setRooms }) => {
    const [newRoom, setNewRoom] = useState(null);
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleCanvasClick = (e) => {
        // Only add a new room if we're in the adding room mode
        if (isAddingRoom) {
            const stage = e.target.getStage();
            const pointerPosition = stage.getPointerPosition();
            setNewRoom({
                x: pointerPosition.x,
                y: pointerPosition.y,
                width: 100, // Default width for new room
                height: 100, // Default height for new room
                name: 'New Room', // Default name for new room
                id: Math.random().toString(36).substr(2, 9), // Randomly generated ID for the new room
            });
        }
    };

    const addRoom = (room) => {
        setRooms(prevRooms => [
            ...prevRooms,
            room
        ]);

        setNewRoom(null);
    }
    const handleRoomClick = (room) => {
        setSelectedRoom(room); // Set the clicked room as the selected room
        // Open a modal or form to edit the room details
    };

    const updateRoomDetails = (updatedRoom) => {
        // Update the room details based on the input from the admin
        const updatedRooms = rooms.map((r) => {
            if (r.id === updatedRoom.id) {
                return { ...r, ...updatedRoom };
            }
            return r;
        });
        setRooms(updatedRooms);
        setSelectedRoom(null); // Close the modal or form after updating
    };
    const deleteRoom = (roomId) => {
        // Filter out the room to delete
        const updatedRooms = rooms.filter((r) => r.id !== roomId);
        setRooms(updatedRooms);
        setSelectedRoom(null); // Close the modal or form after deleting
    };

    return (
        <>
            <button onClick={() => setIsAddingRoom(!isAddingRoom)}>
                {isAddingRoom ? 'Cancel Adding' : 'Add Room'}
            </button>
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleCanvasClick}>
                <Layer>
                    {rooms.map((room) => (
                        <React.Fragment key={room.id}>
                            <Rect
                                x={room.x}
                                y={room.y}
                                width={room.width}
                                height={room.height}
                                fill="#64b5f6"
                                stroke="#0d47a1"
                                strokeWidth={1}
                                draggable
                                onDragEnd={(e) => {
                                    // Update room position when dragged
                                    const updatedRoom = {
                                        ...room,
                                        x: e.target.x(),
                                        y: e.target.y(),
                                    };
                                    updateRoomDetails(updatedRoom);
                                }}
                                onClick={() => handleRoomClick(room)}
                            />
                            <Text // Add room number or name
                                text={room.name}
                                x={room.x}
                                y={room.y}
                                fontSize={15}
                                fill="#fff"
                            />
                        </React.Fragment>
                    ))}
                    {/* Render the new room if it's being added */}
                    {newRoom && (
                        <Rect
                            x={newRoom.x}
                            y={newRoom.y}
                            width={newRoom.width}
                            height={newRoom.height}
                            fill="#9e9e9e"
                            stroke="#0d47a1"
                            strokeWidth={1}
                            dash={[10, 5]} // Dashed border for the new room
                        />
                    )}
                </Layer>
            </Stage>
            {newRoom && (
                <button  onClick={() => addRoom(newRoom)}>
                    Confirm Room Position
                </button>
            )}
            {/* The modal or form to edit room details would go here, using selectedRoom and functions to update or delete */}
        </>
    );
};

export default InteractiveFloorMap;