import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import {Active} from "../Interfaces/Active";

export default function Profile({active, setActive} : Active) {
    const [user, setUser] = useState({
        name: '',
        login: '',
        money: 0
    });
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    async function getUser() {
        const url = 'http://localhost:8060/user/current';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();

            console.log(data);

            localStorage.setItem('user', JSON.stringify(data))
            setUser({
                name: data.name,
                login: data.login,
                money: data.money
            });
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            getUser();
        }
    }, []);

    const activeLink = 'main-window active';
    const defaultLink = 'main-window';

    return (
        <div
            className={active ? activeLink : defaultLink}
            onClick={() => setActive(false)}
        >
            <div
                className="main-window__window-profile"
                onClick={e => e.stopPropagation()}
            >
                <NavLink to="Profile" className="main-window__window-profile__nav">
                    <h1 className="main-window__window-profile__head">
                        {user.name}
                    </h1>
                </NavLink>
                <ul className="main-window__window-profile__info">
                    <NavLink to="Profile" className="main-window__window-profile__nav">
                        <li>Логин: {user.login}</li>
                    </NavLink>
                    <NavLink to="/pins/save" className="main-window__window-profile__nav">
                        <li>Сохраненые пины</li>
                    </NavLink>
                </ul>
                <div className="main-window__window-profile__buttons">
                    <button
                        id="logout"
                        onClick={() => handleLogout()}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}
