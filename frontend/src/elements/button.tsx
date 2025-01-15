import React from 'react';

export default function Button(ButtonProps:ButtonProps) {
    return (
            <button className="button">
                {ButtonProps.content}
            </button>
    )
}

interface ButtonProps {
    content: string
}