import React, {Fragment, useState} from 'react';
import Login from "./pages/login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Container from "./componets/Container";
import Admin from "./pages/Admin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </Router>
    );
}

export default App;
