import React, { useState } from 'react';

const RoomDetailsModal = ({ room, onSave, onDelete, onClose }) => {
    const [name, setName] = useState(room.name);
    const [capacity, setCapacity] = useState(room.capacity);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Room Details</h2>

                <label htmlFor="name">Room Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="
capacity">Room Capacity:</label>
                <input
                    id="capacity"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                />
                <button onClick={() => onSave({ ...room, name, capacity })}>Save Changes</button>
                <button onClick={() => onDelete(room.id)}>Delete Room</button>
            </div>
        </div>
    );
};

export default RoomDetailsModal;