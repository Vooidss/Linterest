import React from 'react';
import Header from '../elements/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ImagesPage from "./ImagesPage";
import CreatePage from "./CreatePage";

export default function MainPage() {
    return (
        <div className = "main_page">
            <Header/>
            <Routes>
                <Route
                    path = "/pins"
                    element={<ImagesPage/>}></Route>
                <Route
                    path = "Create"
                    element={<CreatePage/>}
                ></Route>
            </Routes>
        </div>
    )
}
