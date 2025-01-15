import React, {useState} from 'react';
import Button from './button'
import { NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";


export default function Header(){

    const activeLink: string = "button-active";
    const defaultLink: string = "button";

    return(
        <div className="header">
            <div className="header__start">
                <div className="header__start__logo">
                    <div className="header__start__logo__img"/>
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
                <div className="header__profile__block">
                    <button className="header__profile__block__button">Профиль</button>
                    <CgProfile color="#ffffff" fontSize="20px"/>
                </div>
            </div>
        </div>
    )
}