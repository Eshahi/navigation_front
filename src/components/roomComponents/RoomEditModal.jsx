import React, { useEffect, useState } from 'react';

const RoomDetailsModal = ({ room, onSave, onDelete, onClose }) => {
    const [name, setName] = useState(room.name);
    const [capacity, setCapacity] = useState(room.capacity);

    useEffect(() => {
        if (room) {
            setName(room.name);
            setCapacity(room.capacity);
        }
    }, [room]);

    const handleSave = () => {
        onSave({ ...room, name, capacity });
    };

    return (
        <form className="w-96 mx-auto p-8 bg-base-200 rounded-box" onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
                <button className="btn btn-warning" onClick={onClose}>
                    Close
                </button>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Room Name</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Room Capacity</span>
                </label>
                <input
                    id="capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="input input-bordered"
                />
            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                </button>
            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={() => onDelete(room.id)}>
                    Delete Room
                </button>
            </div>
        </form>
    );
};

export default RoomDetailsModal;
