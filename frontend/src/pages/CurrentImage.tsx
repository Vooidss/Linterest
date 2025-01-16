import React, {useState} from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";


export default function CurrentImage(){

    const [isHover, setIsHover] = useState(false);

    return(
        <div className="current-image">
            <div className="current-image__block">
                <div className="current-image__block__image-block">
                    <div className="current-image__block__image-block__exit">
                        <div className="current-image__block__image-block__exit__blackout"
                             onMouseMove={() => setIsHover(true)}
                             onMouseLeave={() => setIsHover(false)}
                        style={{
                            backgroundColor: isHover ? "rgba(147, 141, 141, 0.17)" : "inherit"
                        }}
                        >
                            <IoMdArrowRoundBack style ={{
                                scale: "1.5"
                            }}/>
                        </div>
                    </div>
                    <div className="current-image__block__image-block__main-block">
                        <div className="current-image__block__image-block__main-block__image"></div>
                        <div className="current-image__block__image-block__main-block__other"></div>
                    </div>
                </div>
            </div>
            <div className="current-image__other-image"></div>
        </div>
    )
}