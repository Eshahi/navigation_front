import React from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";

const InteractiveFloorMap = ({ rooms, onRoomSelect, onMapClick }) => {
    return (

        <Stage width={window.innerWidth} height={window.innerHeight} onClick={onMapClick}>
            <Layer>
                {rooms.map((room) => (

                    <Group

                        key={room.id}
                        x={room.x}
                        y={room.y}
                        draggable
                        onDragEnd={(e) => {
                            // Call onRoomSelect with the updated room position
                            onRoomSelect({
                                ...room,
                                x: e.target.x(),
                                y: e.target.y()
                            });
                        }}
                    >
                        {console.log("is room elevator", room.isElevator)}

                        <Rect
                            width={room.width}
                            height={room.height}
                            fill={room.isElevator ? "#000000" : "#64b5f6"}
                            stroke="#0d47a1"
                            strokeWidth={1}
                        />
                        <Text
                            text={room.name}
                            fontSize={15}
                            fill="#fff"
                        />
                    </Group>
                ))}
            </Layer>
        </Stage>
    );
};

export default InteractiveFloorMap;
