import React, {useState} from 'react';
import Image from '../elements/Image'

export default function ImagesPage (){

    const [images, setImages] = useState<Images[]>([
        {link: "logo2.png"},
        {link:"https://i.pinimg.com/736x/79/03/da/7903da869765768a137ebf67df93bae0.jpg"},
        {link:"https://i.pinimg.com/736x/ff/97/b6/ff97b699d6056a32c5d7d736fb165752.jpg"},
        {link:"https://i.pinimg.com/736x/71/a9/16/71a916609bee65812de8af59bc872645.jpg"},
        {link:"https://i.pinimg.com/736x/bf/2c/9b/bf2c9b02f0e26118486d3c5e118e0e07.jpg"},
        {link:"https://i.pinimg.com/736x/79/16/1d/79161dfc7e3a5f04dd2771063ccf8891.jpg"},
        {link:"https://i.pinimg.com/736x/95/70/86/9570862597bdf9d95752d43ae7de79d3.jpg"},
        {link:"https://i.pinimg.com/736x/e6/e7/07/e6e70723c59fbac980219a3c68f0dac7.jpg"},
        {link:"https://i.pinimg.com/736x/a8/a0/8f/a8a08f5d36571917771180de88d88a07.jpg"}
    ]);


    return(
        <div className="image_page">
            <div className="image_page__board">
                {images.map((image, index) => (
                    <Image link={image.link} key={index}/>
                ))}
            </div>
        </div>
    )
}

export interface Images{
    link: string
}

