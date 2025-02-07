import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from "../elements/Image"
import {Images} from "../Interfaces/Images"

export default function ImagesPage (){

    const [images, setImages] = useState<Images[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [hashes, setHashes] = useState<string[]>([]);

    useEffect(() => {
        handleGetImages();
        // document.addEventListener('scroll', handlerScrollWindow);
        // return function (){
        //     document.removeEventListener('scroll', handlerScrollWindow);
        // }
    }, []);

    useEffect(() => {
        if(hashes){
            hashes.map((hash) => {
                handleGetImageByHash(hash);
            })
        }
    }, [hashes]);

    // useEffect(() => {
    //     if(fetching){
    //         handleGetImages();
    //     }
    // }, [fetching]);

    useEffect( () => {
        document.title = "Linterest";
    }, [images]);

    const handlerScrollWindow =  (e:any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
        {
            setFetching(true);
        }
    }

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
                    console.log('Имя файла без расширения:', fileName);
                    setImages((prev) => [...prev, {imageSrc: url, image: data, hash: hash, name: fileName}]);
                    console.log(data);
                });
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        }
    };

    const handleGetImages = async () => {
        setFetching(true);
        try {
            const response = await axios.get("http://localhost:8010/pins/get/all");

            setHashes(response.data.hashes);

            console.log(response.data.hashes);
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
        } finally {
            setFetching(false);
        }
    };


    return(
        <div className="image_page">
            <div className="image_page__board">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="image_page__board__image">
                            <Image imageSrc={image.imageSrc} image={image.image} hash={image.hash} name={image.name}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
