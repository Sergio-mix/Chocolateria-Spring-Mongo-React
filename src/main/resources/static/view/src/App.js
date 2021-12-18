import React, {Fragment, useState} from 'react';
import Login from "./pages/login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Ase from "./pages/Ase";
import Coord from "./pages/Coord";
import Products from "./pages/Products";
import Birthday from "./pages/Birthday";

function App() {
    return (
        <Router>
            <Routes>
                <Route  path="/" element={<Login/>}/>
                <Route  path="/profile" element={<Profile/>}/>
                <Route  path="/admin" element={<Admin/>}/>
                <Route  path="/ase" element={<Ase/>}/>
                <Route  path="/products" element={<Products/>}/>
                <Route  path="/Coord" element={<Coord/>}/>
                <Route  path="/birthday" element={<Birthday/>}/>
            </Routes>
        </Router>
    );
}

export default App;
