// FloorForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// const FloorForm = ({ setFloors }) => {
//     const [floorNumber, setFloorNumber] = useState('');
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post
//         ('/api/floors', { floor_number: floorNumber })
//             .then(response => {
// // Update the floors state with the new floor
//                 setFloors(prevFloors => [...prevFloors, response.data]);
//                 setFloorNumber(''); // Reset the form
//             })
//             .catch(error => console.error('Error creating floor', error));
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Floor Number:
//                 <input
//                     type="text"
//                     value={floorNumber}
//                     onChange={(e) => setFloorNumber(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Add Floor</button>
//         </form>
//     );
// };

const FloorForm = ({ setFloors }) => {
    const [floorNumber, setFloorNumber] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Assuming IDs are generated automatically by the backend
        // For the frontend, you can use a temporary ID or use the floor number
        const newFloor = {
            id: Date.now(), // Temporary unique ID until backend integration
            floor_number: parseInt(floorNumber),
            description: description,
            rooms: [] // New floors start with no rooms
        };

        setFloors(floors => [...floors, newFloor]);

        // Reset form fields
        setFloorNumber('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={floorNumber}
                onChange={e => setFloorNumber(e.target.value)}
                placeholder="Floor Number"
                required
            />
            <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                required />
            <button type="submit">Add Floor</button>
        </form>
    );
};
export default FloorForm;