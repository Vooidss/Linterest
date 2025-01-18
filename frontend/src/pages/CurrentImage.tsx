import React, {useState} from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'



export default function CurrentImage(){

    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);

    const handleClick = () => {
        navigate(`/pins`)
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
                        <div className="current-image__block__image-block__main-block__image"></div>
                        <div className="current-image__block__image-block__main-block__other"></div>
                    </div>
                </div>
            </div>
            <div className="current-image__other-image"></div>
        </div>
    )
}