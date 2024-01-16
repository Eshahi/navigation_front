import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const InteractiveFloorMap = ({ rooms, onRoomSelect, onMapClick }) => {
    return (
        <>
            <Stage width={window.innerWidth} height={window.innerHeight} onClick={onMapClick}>
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
                                onDragEnd={(e) => onRoomSelect({ ...room, x: e.target.x(), y: e.target.y() })}
                                onClick={() => onRoomSelect(room)}
                            />
                            <Text
                                text={room.name}
                                x={room.x}
                                y={room.y}
                                fontSize={15}
                                fill="#fff"
                            />
                        </React.Fragment>
                    ))}
                </Layer>
            </Stage>
        </>
    );
};

export default InteractiveFloorMap;
