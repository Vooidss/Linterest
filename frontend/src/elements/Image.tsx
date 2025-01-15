import React, { useState } from 'react';
import {Images} from "../pages/ImagesPage";

export default function Image({ link }: Images) {
    const [isHover, setIsHover] = useState(false);

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
                    <div className="image__block__download"></div>
                </div>
            </div>
            <img
                className="image__self"
                src={link}
                alt="Картинка"
            />
        </div>
    );
}
