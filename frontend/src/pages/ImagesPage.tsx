import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from "../elements/Image"

export default function ImagesPage (){

    const [images, setImages] = useState<Images[]>([]);


    useEffect(() => {
        handleGetImages();
    }, []);

    const handleGetImages = async () => {
        const response =  await axios('http://localhost:8010/pins/get');
        setImages(response.data.images)
    }

    return(
        <div className="image_page">
            <div className="image_page__board">
                {images.map((image,index) =>
                    <Image image = {image.image} key = {index}  description={image.description} name={image.name} contentType={image.contentType} fileName={image.fileName}/>
                )}
            </div>
        </div>
    )
}

export interface Images{
    name: string
    description: string
    contentType: string
    fileName: string
    image: any
}

