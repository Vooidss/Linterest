import React from 'react';
import Header from '../elements/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ImagesPage from "./ImagesPage";
import CreatePage from "./CreatePage";
import CurrentImage from "./CurrentImage";

// import SavesImagePage from "./SavesImagePage";
export default function MainPage() {
    return (
        <div className = "main_page">
            <Header/>
            <Routes>
                <Route
                    path = "/pins"
                    element={<ImagesPage/>}></Route>
                <Route
                    path = "/create"
                    element={<CreatePage/>}
                ></Route>
                <Route
                    path = "/pins/image/:hash"
                    element={<CurrentImage/>}
                ></Route>
                {/*<Route*/}
                {/*    path="/pins/save"*/}
                {/*    element={<SavesImagePage/>}></Route>*/}
            </Routes>
        </div>
    )
}
