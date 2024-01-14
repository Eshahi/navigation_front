// src/components/mapComponents/MapNavigator.jsx

import React, { useState } from 'react';

const MapNavigator = () => {
    const [currentFloor, setCurrentFloor] = useState('first'); // The selected floor

    // Placeholder component for the first floor
    const FirstFloorPlaceholder = () => (
        <div style={{ width: '100%', height: '500px', background: '#eaeaea' }}>
            <p style={{ textAlign: 'center' }}>First Floor - Placeholder</p>
        </div>
    );

    // Placeholder component for the second floor
    const SecondFloorPlaceholder = () => (
        <div style={{ width: '100%', height: '500px', background: '#dcdcdc' }}>
            <p style={{ textAlign: 'center' }}>Second Floor - Placeholder</p>
        </div>
    );

    return (
        <div>
            <button onClick={() => setCurrentFloor('first')}>First Floor</button>
            <button onClick={() => setCurrentFloor('second')}>Second Floor</button>
            {/* Render the placeholder component based on the currentFloor state */}
            {currentFloor === 'first' ? <FirstFloorPlaceholder /> : <SecondFloorPlaceholder />}
        </div>
    );
};

export default MapNavigator;
