import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import {Images} from "../pages/ImagesPage";

export default function Image({name,image,contentType,fileName}:Images,key:bigint) {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        //TODO: ПЕРЕДЕЛАТЬ ПОТОМ ПОД ID КАЖДОЙ КАРТИНКИ
        navigate(`/pins/image`)
    }

    useEffect(() => {
        console.log(contentType)
    }, []);


    function downloadImage(image: any): void {
        const blob = new Blob([image], { type: contentType });
        const imageUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }


    return (
        <div className="image"
             onMouseEnter={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
        >
            {isHover ?
                <button className="image__safe">
                    Сохранить
                </button> : ""}
            {isHover ?
                <div className="image__block">
                    <a className="image__block__download" onClick={() => downloadImage(image)}>
                    </a>
                </div> : ""}
            <img
                onClick={() => handleClick()}
                style={{filter: isHover ? "brightness(50%)" : "none"}}
                className="image__self"
                src = {`data:${contentType};base64,${image}`}
                alt="Картинка"
            />
        </div>
    );
}
