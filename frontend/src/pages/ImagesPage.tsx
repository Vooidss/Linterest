import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from "../elements/Image"
import {Images} from "../Interfaces/Images"

export default function ImagesPage (){

    const [images, setImages] = useState<Images[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        console.log(totalCount);
        console.log(images);
        document.addEventListener('scroll', handlerScrollWindow);
        return function (){
            document.removeEventListener('scroll', handlerScrollWindow);
        }
    }, []);

    useEffect(() => {
        if(fetching){
            handleGetImages();
        }
    }, [fetching]);

    useEffect( () => {
        document.title = "Linterest";
    }, [images]);

    const handlerScrollWindow =  (e:any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
        {
            setFetching(true);
        }
    }

    const handleGetImages = async () => {

        const response =  await axios(`http://localhost:8010/pins/get?size=25&page=${currentPage}`)
            .then(response => {
                setImages([...images, ...response.data.images.data]);
                setCurrentPage(prevState => prevState + 1);
                setTotalCount(response.data.images.totalCount)
            }).finally(() => setFetching(false));}

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
