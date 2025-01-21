import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from "../elements/Image"
import {Images} from "../Interfaces/Images"

export default function ImagesPage (){

    const [images, setImages] = useState<Images[]>([]);


    useEffect(() => {
        handleGetImages();
    }, []);

    useEffect( () => {
        document.title = "Linterest";
    }, [images]);

    const handleGetImages = async () => {
        const response =  await axios('http://localhost:8010/pins/get');
        setImages(response.data.images)
    }

    return(
        <div className="image_page">
            <div className="image_page__board">
                {images.map((image,index) =>
                    <Image id = {image.id} image = {image.image} key = {index} contentType={image.contentType} fileName={image.fileName}/>
                )}
            </div>
        </div>
    )
}
