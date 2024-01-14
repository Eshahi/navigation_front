import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const InteractiveFloorMap = ({ rooms, setRooms, onRoomClick }) => {
    const [newRoom, setNewRoom] = useState(null);
    const [isAddingRoom, setIsAddingRoom] = useState(false);

    const handleCanvasClick = (e) => {
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

    const addRoom = () => {
        if (newRoom) {
            setRooms([...rooms, newRoom]);
            setNewRoom(null); //
            setIsAddingRoom(false); // Exit adding room mode
        }
    };
    return (
        <>
            <button onClick={() => setIsAddingRoom(!isAddingRoom)}>
                {isAddingRoom ? 'Cancel Adding' : 'Add Room'}
            </button>
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleCanvasClick}>
                <Layer>
                    {rooms.map((room, index) => (
                        <Rect
                            key={room.id}
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
                                const updatedRooms = rooms.map((r) => {
                                    if (r.id === room.id) {
                                        return { ...r, x: e.target.x(), y: e.target.y() };
                                    }
                                    return r;
                                });
                                setRooms(updatedRooms);
                            }}
                            onClick={() => onRoomClick(room.id)}
                        />
                    ))}
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
                <button onClick={addRoom}>
                    Confirm Room Position
                </button>
            )}
        </>
    );
};

export default InteractiveFloorMap;