import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {Images} from "../pages/ImagesPage";

export default function Image({ link }: Images, key:bigint) {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        //TODO: ПЕРЕДЕЛАТЬ ПОТОМ ПОД ID КАЖДОЙ КАРТИНКИ
        navigate(`/pins/image`)
    }

    function downloadImage(imageUrl: string, fileName: string): void {
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
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.49)',
                    position: 'absolute',
                    zIndex: 100,
                    width: '100%',
                    height: '100%',
                    borderRadius: '10%',
                    top: 0,
                    left: 0,
                    display: isHover ? 'block' : 'none',
                    transition: 'background-color 0.3s',
                    cursor:"pointer"
                }}
            >
                <button className="image__safe">
                    Сохранить
                </button>
                <div className="image__block">
                    <a href = {link} download>
                        <img className="image__block__download" src = {link} alt = "хуй"/>
                    </a>
                </div>
            </div>
            <img
                onClick={() => handleClick()}
                className="image__self"
                src={link}
                alt="Картинка"
            />
        </div>
    );
}
