import React, { useEffect, useState } from 'react'
import {CustomInput} from "../Interfaces/CustomInput";

export default function CustomInput({text,value,setValue,width}:CustomInput) {

    const [inputValue, setInputValue] = useState(value || '');
    const [isVision, setIsVision] = useState(false);

    useEffect(() => {
        setValue(inputValue);
        setIsVision(inputValue !== '');
    }, [inputValue])
    
    const handleChange = (e:any) => {
        let value = e.target.value;
        setInputValue(value);
        setIsVision(value !== '');
    };

    return (
        <div className="component">
           <p style={{
               transform: isVision ? 'scale(1)' : 'scale(0)'
           }}>{text}</p>
            <input
                required
                type="text"
                className="component__input"
                placeholder={`${text}`}
                onChange={handleChange}
                value={value}
                style={{
                    maxWidth: width ? width : ''
                }}
            />
        </div>
    )

}