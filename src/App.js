import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './adminPanel/AdminPanel';
import Home from './components/mapComponents/StatcFloorPlan'; // Assume you have a Home component


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin_panel" element={<AdminPanel />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
