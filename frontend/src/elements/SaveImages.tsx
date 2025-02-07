// import React, {useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom'
// import {Images} from "../Interfaces/Images";
// import axios from "axios";
//
// export default function SaveImages({id,image,contentType,fileName}:Images,key:bigint) {
//     const [isHover, setIsHover] = useState(false);
//     const navigate = useNavigate();
//
//     const handleClick = () => {
//         navigate(`/pins/image/${id}`)
//     }
//
//     const handleLikeImage = async () => {
//         if(localStorage.getItem("token")){
//             const response = await axios.post("http://localhost:8060/user/likeImage", {
//                 imageId: id
//             }, {
//                 headers:{
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 }
//             })
//         }
//     }
//
//     function downloadImage(image: any): void {
//         const blob = new Blob([image], { type: contentType });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//
//         a.href = url;
//         a.download = fileName;
//
//         document.body.appendChild(a);
//
//         a.click();
//         a.remove();
//
//         window.URL.revokeObjectURL(url);
//     }
//
//     const buttonIsPressed:string = "buttonSaveIsPressed";
//
//     return (
//         <div className="image"
//              onMouseEnter={() => setIsHover(true)}
//              onMouseLeave={() => setIsHover(false)}
//         >
//             {isHover ?
//                 <button className={buttonIsPressed} onClick = {() => handleLikeImage()}>
//                     Удалить
//                 </button> : ""}
//             {isHover ?
//                 <div className="image__block">
//                     <a className="image__block__download" onClick={() => downloadImage(image)}>
//                     </a>
//                 </div> : ""}
//             <img
//                 onClick={() => handleClick()}
//                 style={{filter: isHover ? "brightness(50%)" : "none"}}
//                 className="image__self"
//                 src = {`data:${contentType};base64,${image}`}
//                 alt="Картинка"
//             />
//         </div>
//     );
// }
export {};
