import React, { useState, useEffect } from 'react';
import {User} from "../Interfaces/User";
import CustomInput from "../elements/CustomInput";

export default function Profile() {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        login: ''
    });
    const [likes, setLikes] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                setLoaded(false);
                window.location.reload()
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    if (!user) {
        return <div className="profile-main-window">
            <div className="profile-main-widow__profile">
                <h1>Вы ещё не вошли</h1>
            </div>
        </div>;
    }


    return (
        <div className="profile-main-window">
            <div className="profile-main-widow__profile">
                <h1 id = "my_data">Мои данные</h1>
                <div className="profile-main-window__profile__form">
                    <div className="profile-main-window__profile__form__inputs">
                    </div>
                    <div className="profile-main-window__profile__form__email">
                    </div>
                    <button
                        className="profile-main-window__profile__form__save">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
