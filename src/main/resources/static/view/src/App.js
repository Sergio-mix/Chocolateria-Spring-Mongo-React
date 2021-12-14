import React, {Fragment, useState} from 'react';
import Login from "./pages/login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Container from "./componets/Container";
import Admin from "./pages/Admin";
import Ase from "./pages/Ase";
import Coord from "./pages/Coord";

function App() {
    return (
        <Router>
            <Routes>
                <Route strict path="/" element={<Login/>}/>
                <Route strict path="/profile" element={<Profile/>}/>
                <Route strict path="/admin" element={<Admin/>}/>
                <Route strict path="/ase" element={<Ase/>}/>
                <Route strict path="/Coord" element={<Coord/>}/>
            </Routes>
        </Router>
    );
}

export default App;
