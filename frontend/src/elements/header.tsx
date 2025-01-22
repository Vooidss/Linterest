import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Authorization from "./Authorization";
import Profile from "./ProfileWindow";


export default function Header(){

    const navigate = useNavigate();

    const activeLink: string = "button-active";
    const defaultLink: string = "button";

    const[isActive, setIsActive] = useState(false);

    const handleClickForBack = () => {
        navigate(`/pins`)
    }
    const handleClickForNavigateToProfile = () => {
        navigate(`/profile`)
    }

    return(
        <div className="header">
            <div className="header__start">
                <div className="header__start__logo">
                    <div className="header__start__logo__img" onClick={() => handleClickForBack()}/>
                </div>
                <NavLink to={"/pins"} className={({isActive}) => isActive ? activeLink : defaultLink}>
                    <button className="button">Главная</button>
                </NavLink>
                <NavLink to={"/Create"} className={({isActive}) => isActive ? activeLink : defaultLink}>
                    <button className="button">Создать</button>
                </NavLink>
            </div>
            <div className="header__search">
                <div className="header__search__block">
                    <CiSearch className="header__search__block__icon"/>
                    <input className="header__search__block__input"/>
                </div>
            </div>
            <div className="header__profile">
                <div className="header__profile__block" onClick={() => setIsActive(true)}>
                    <button className="header__profile__block__button">
                        {localStorage.getItem("token") ? "Профиль" : "Войти"}
                    </button>
                    <CgProfile color="#ffffff" fontSize="20px"/>
                </div>
            </div>
            {
                localStorage.getItem("token") ?
                    isActive && <Profile active = {isActive} setActive={setIsActive}/>
                    :
                    isActive && <Authorization active = {isActive} setActive={setIsActive}/>
            }
        </div>
    )
}