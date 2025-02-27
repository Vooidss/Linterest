import React, { useEffect, useState } from 'react'
import {Active} from "../Interfaces/Active";
import {User} from "../Interfaces/User";

export default function Authorization({active, setActive} : Active) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const[user,setUser] = useState<User>({
        name: '',
        login: '',
        password: '',
        email: ''
    })

    const [isError, setError] = useState(false)
    const [isErrorReg, setErrorReg] = useState(false)
    const [isReg, setReg] = useState(false)
    const [errorText, setErrorText] = useState("");
    const [Authentication, setAuthentication] = useState(false);

    const activeLink = 'mainWindow active'
    const defaultLink = 'mainWindow'

    function setRegistration(){
        if(!isReg){
            setReg(true);
        }else{
            setReg(false)
        }
    }

    const registration = async () => {
            await fetch(
                'http://localhost:8060/auth/registration',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
                .then(response => response.json())
                .then(data => {
                        if (data.code >= 200 && data.code <= 299) {
                            setReg(false);
                        }else{
                            console.error(data.error)
                            setErrorReg(true);
                            setErrorText(data.error)
                        }
                    }
                )
                .then(error => console.error(error))

        }

    const authentication = async () => {
        const credentials = { login, password }

        try {
            const response = await fetch(
                'http://localhost:8060/auth/authentication',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                },
            )

            const data = await response.json()

            if (data.code >= 200 && data.code <= 299) {
                console.log('Success:', data.token)
                localStorage.setItem('token', data.token)
                setError(data.failed)
                setAuthentication(true)
                setActive(false)
                window.location.reload();
            } else {
                console.error(data)
                console.error('Error:', data.error)
                setError(data.failed)
                console.log(isError)
            }
        } catch (error) {
            console.error('Network error:', error)
        }
    }

    return (
        <div
            className={active ? activeLink : defaultLink}
            onClick={() => setActive(false)
            }
        >{isReg ? (
            <div
                className="mainWindow__authenticationWindow" style = {{
                    height: '500px'
            }
            }
                onClick={e => e.stopPropagation()}
            >
                <h1 className="mainWindow__authenticationWindow__head">
                    Регистрация
                </h1>
                <div className="mainWindow__authenticationWindow__inputs">
                    <input
                        autoComplete="on"
                        type="email"
                        required
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Логин"
                        value={user.login}
                        onChange={e => setUser(user => ({
                            ...user,
                            login: e.target.value}
                        ))}
                    />
                    <input
                        autoComplete="on"
                        type="password"
                        required
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Пароль"
                        value={user.password}
                        onChange={e => setUser(user => ({
                                ...user,
                                password: e.target.value}
                        ))}
                    />
                    <input
                        required
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Имя"
                        value={user.name}
                        onChange={e => setUser(user => ({
                                ...user,
                                name: e.target.value}
                        ))}
                    />
                    <input
                        required
                        type="email"
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Почта"
                        value={user.email}
                        onChange={e => setUser(user => ({
                                ...user,
                                email: e.target.value}
                        ))}
                    />
                    {isErrorReg && (
                        <p className={
                            isErrorReg
                                ? 'mainWindow__authenticationWindow__error active'
                                : 'mainWindow__authenticationWindow__error'
                        }>{errorText}</p>
                    )}
                </div>
                <div className="mainWindow__authenticationWindow__under">
                    <button
                        className="mainWindow__authenticationWindow__under__botton"
                        onClick={registration}
                    >
                        Зарегистрироваться
                    </button>
                    <a className="mainWindow__authenticationWindow__under__checkout" onClick={setRegistration}>
                        Войти
                    </a>
                </div>
            </div>

        ) : (
            <div
                className="mainWindow__authenticationWindow"
                onClick={e => e.stopPropagation()}
                style ={{
                    gridTemplateRows: '40% 40% 20%'
                }}
            >
                <h1 className="mainWindow__authenticationWindow__head">
                    Авторизация
                </h1>
                <div className="mainWindow__authenticationWindow__inputs">
                    <input
                        autoComplete="on"
                        type="email"
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        autoComplete="on"
                        type="password"
                        className="mainWindow__authenticationWindow__input"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <a
                        className={
                            isError
                                ? 'mainWindow__authenticationWindow__error active'
                                : 'mainWindow__authenticationWindow__error'
                        }
                    >
                        Неверный логин или пароль
                    </a>
                </div>
                <div className="mainWindow__authenticationWindow__under">
                    <button
                        className="mainWindow__authenticationWindow__under__botton"
                        onClick={authentication}
                    >
                        Войти
                    </button>
                    <a className="mainWindow__authenticationWindow__under__checkout" onClick={setRegistration}>
                        Зарегестрироваться
                    </a>
                </div>
            </div>
        )}
        </div>
    )
}
