import React from 'react';

export default function InputDescriptionForNewPin(props: InputDescriptionProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    return (
        <div className="inputForDescriptionPin">
            <label htmlFor={props.name}>{props.name}</label>
            {props.textarea ?
                <textarea
                    name={props.Name}
                    style={{
                        height: props.height,
                        resize: "none"
                    }}
                    className="inputForDescriptionPin__style"
                    id={props.name}
                    placeholder={props.placeholder}
                    onChange={handleChange}
                />
                :
                <input
                    name={props.Name}
                    className="inputForDescriptionPin__style"
                    style={{
                        height: props.height
                    }}
                    id={props.name}
                    placeholder={props.placeholder}
                    onChange={handleChange}
                />
            }
        </div>
    )
}

interface InputDescriptionProps {
    name: string,
    Name: string,
    placeholder?: string,
    height?: string,
    textarea?: boolean,
    onChange?: (value: string) => void;
}
