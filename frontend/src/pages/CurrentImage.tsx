import React, {useEffect, useState} from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import {Images} from "../Interfaces/Images"

export default function CurrentImage(){

    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const { hash } = useParams();
    const [image, setImage] = useState<Images>({
        imageSrc: "",
        image: null,
        hash: "",
        name: "",
        description: "",
    });


    const handleClick = () => {
        navigate(`/pins`)
    }

    useEffect( () => {
        if(hash) {
            handleGetImageByHash(hash);
        }
    }, []);

    useEffect( () => {
        if(image != null && image.name != null){
            document.title = image.name;
            console.log(image)
        }
    }, [image]);


    const handleGetImageByHash = async (hash:string) => {
        try {
            const response = await fetch(`http://localhost:8010/pins/get/${hash}`)
                .then( async (response) => {
                    const data = await response.blob();
                    const url = URL.createObjectURL(data);
                    const contentDisposition =  response.headers.get('content-disposition');
                    let fileName = '';
                    if (contentDisposition && contentDisposition.includes('filename=')) {
                        const parts = contentDisposition.split('filename=');
                        if (parts.length > 1 && parts[1]) {

                            fileName = parts[1].replace(/"/g, '').trim();

                            const dotIndex = fileName.lastIndexOf('.');
                            if (dotIndex > 0) {
                                fileName = fileName.substring(0, dotIndex);
                            }
                        }
                    }
                    setImage({imageSrc: url, image: data, hash: hash, name: fileName});
                    handleGetOtherInformationImage(hash);
                });
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        }
    };
    const handleGetOtherInformationImage = async (hash:string) => {
        try {
            const response = await axios.get(`http://localhost:8010/pins/get/other/${hash}`)
            setImage((prev) => ({...prev, description: response.data.description}));
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        }
    };

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
                            { image && image.imageSrc !=null ?
                                    <img className="current-image__block__image-block__main-block__image" id = "img" src={image.imageSrc} alt = {image.name}/>
                                :                         <div className="current-image__block__image-block__main-block__image"> </div>}
                        <div className="current-image__block__image-block__main-block__other">
                            <div className="current-image__block__image-block__main-block__other__buttons">
                                <button className="buttonCurrentImage">Сохранить</button>
                                <button className="buttonCurrentImage" style={{backgroundColor:"black"}}>Скачать</button>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__name">
                                <h1>{image.name}</h1>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__name">
                                <h1>АВТОР</h1>
                            </div>
                            <div className="current-image__block__image-block__main-block__other__description">
                                <p>
                                    {image.description}
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

