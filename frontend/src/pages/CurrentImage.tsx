import React, {useEffect, useState} from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import {Images} from "../Interfaces/Images"

export default function CurrentImage(){

    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const { id } = useParams();
    const [image, setImage] = useState<Images | null>();


    const handleClick = () => {
        navigate(`/pins`)
    }

    useEffect( () => {
        handleGetImageById();

        if(image != null && image.name != null){
            document.title = image.name;
        }
    }, []);

    useEffect( () => {
        if(image != null && image.name != null){
            document.title = image.name;
        }
    }, [image]);


    const handleGetImageById = async () => {
        const response = await axios(`http://localhost:8010/pins/get/${id}`);
        setImage(response.data.image);
        console.log(response.data.image);
    }


    return(
        <div className="current-image">
            <div className="current-image__block">
                <div className="current-image__block__image-block">
                    <div className="current-image__block__image-block__exit">
                        <div className="current-image__block__image-block__exit__blackout"
                             onMouseMove={() => setIsHover(true)}
                             onMouseLeave={() => setIsHover(false)}
                             onClick = {() => handleClick()}
                        style={{
                            backgroundColor: isHover ? "rgba(147, 141, 141, 0.17)" : "inherit"
                        }}
                        >
                            <IoMdArrowRoundBack style ={{
                                scale: "1.5"
                            }}
                            />
                        </div>
                    </div>
                    <div className="current-image__block__image-block__main-block">
                            { image ?
                                    <img className="current-image__block__image-block__main-block__image" id = "img" src={`data:${image.contentType};base64,${image.image}`} alt = {image.name}/>
                                :                         <div className="current-image__block__image-block__main-block__image"> </div>}
                        <div className="current-image__block__image-block__main-block__other">
                            <div className="current-image__block__image-block__main-block__other__buttons">
                                <button className="buttonCurrentImage">Сохранить</button>
                                <button className="buttonCurrentImage" style={{backgroundColor:"black"}}>Скачать</button>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__name">
                                <h1>{image?.name}</h1>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__name">
                                <h1>АВТОР</h1>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__description">
                                <p>
                                    {image?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="current-image__other-image"></div>
        </div>
    )
}