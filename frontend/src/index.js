import * as ReactDOMClient from 'react-dom/client'
import './css/main.css'
import MainPage from "./pages/MainPage";
import {BrowserRouter} from "react-router-dom";

const element = document.getElementById('main')
const app = ReactDOMClient.createRoot(element)

app.render(
    <BrowserRouter>
    <MainPage />
    </BrowserRouter>
)
