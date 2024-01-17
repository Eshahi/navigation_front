import React from "react";

const GetPathStartAndEnd = ({
                                startRoom,
                                setStartRoom,
                                endRoom,
                                setEndRoom,
                                currentRooms
                            }) => {

    return (
        <form className="w-96 mx-auto p-8 bg-base-200 rounded-box">

            <div className="form-control">
                <select
                    className="select select-bordered"
                    value={startRoom}
                    onChange={e => setStartRoom(e.target.value)}
                >{currentRooms.map(room => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-control">
                <select
                    className="select select-bordered"
                    value={endRoom}
                    onChange={e => setEndRoom(e.target.value)}
                >
                    {currentRooms.map(room => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>

        </form>
    );
}

export default GetPathStartAndEnd;