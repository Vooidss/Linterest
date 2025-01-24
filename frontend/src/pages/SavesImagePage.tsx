import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Images} from "../Interfaces/Images";
import Image from "../elements/Image";
import SaveImages from "../elements/SaveImages";

export default function SavesImagePage (){

    const [saveImages, setIsSaveImages] = useState<Images[]>([]);

    useEffect(() => {
        handleGetSaveImages()
    }, []);

    const handleGetSaveImages = async () => {
        const response = await axios.get("http://localhost:8060/user/getSavesImage", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + localStorage.getItem("token"),
            }
        }).then((response) => {
            setIsSaveImages(response.data.images);
        })
    }

    return(
        <div className="save-page">
            <div className="save-page__caption">
                <span className="save-page__caption__name">Сохранённые пины</span>
            </div>
            <div className="save-page__main-block">
                <div className="save-page__main-block__board">
                    {
                        saveImages && saveImages.map((images, key) =>
                            <SaveImages id={images.id} image={images.image} key={key} contentType={images.contentType}
                                        fileName={images.fileName}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}