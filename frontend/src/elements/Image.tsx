import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import {Images} from "../Interfaces/Images";
import axios from "axios";
import {saveAs} from "file-saver";

export default function Image({imageSrc,image,hash,name}:Images,key:bigint) {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    //TODO: Реализовать проверку сохранял ли пользователь уже данную картинку
    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
        navigate(`/pins/image/${hash}`)
    }

    // const handleLikeImage = async () => {
    //     if(localStorage.getItem("token")){
    //         const response = await axios.post("http://localhost:8060/user/likeImage", {
    //             imageId: 1
    //         }, {
    //             headers:{
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             }
    //         }).then( (response) => {
    //                 if(response.data.httpStatusCode >= 200 && response.data.httpStatusCode < 300){
    //                     setIsLiked(true);
    //                 }
    //         })
    //     }
    // }

    const handleDownloadFile = () => {
            saveAs(image, name);
        };


    const buttonIsNotPressed:string = "buttonSave";
    const buttonIsPressed:string = "buttonSaveIsPressed";

    if(imageSrc == null){
        return (
            <div>Нэт</div>
        )
    }

    return (
        <div className="image"
             onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
        >
            {isHover ?
                <button className={buttonIsNotPressed}>
                    Сохранить
                </button> : ""}
            {isHover ?
                <div className="image__block">
                    <a className="image__block__download" onClick={handleDownloadFile}>
                    </a>
                </div> : ""}
            <img
                onClick={() => handleClick()}
                style={{filter: isHover ? "brightness(50%)" : "none"}}
                className="image__self"
                src={imageSrc}
                alt="Загруженное изображение"
            />
        </div>
    );
}
