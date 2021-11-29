import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import AuthService from '../../apis/AuthService'
import Warning from '../../components/auth/Warning'
import localStorageKey from '../../constants/LocalStorageKeys'
import { setUser } from '../../store/Actions'

export default function Login() {
    const [warnings, setWarnings] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        setWarnings([])
        setLoading(true)
        const username = e.target.username.value
        const password = e.target.password.value
        const error = []
        if (!username) {
            error.push('Vui lòng nhập tên đăng nhập')
        }
        if (!password) {
            error.push('Vui lòng nhập mật khẩu')
        }
        if (error.length) {
            setWarnings(error)
            setLoading(false)
        } else {
            AuthService.login({ username, password })
                .then((res) => {
                    setLoading(false)
                    setUser(res.data.user)
                    window.localStorage.setItem(localStorageKey.TOKEN, res.data.token)
                    navigate('/inbox')
                })
                .catch(() => {
                    setLoading(false)
                    setWarnings(['Đăng nhập thất bại'])
                })
        }
    }

    return (
        <LoginPage>
            <LoginForm onSubmit={handleLogin}>
                <h3>Đăng nhập</h3>
                <div className="input">
                    <div className="prefix"><i className="fas fa-user"></i></div>
                    <input type="text" name="username" placeholder="Tên đăng nhập"/>
                </div>
                <div className="input">
                    <div className="prefix"><i className="fas fa-key"></i></div>
                    <input type="password" name="password" placeholder="Mật khẩu"/>
                </div>
                <button type="submit">Đăng nhập {loading && <i className="fas fa-spin-1s fa-circle-notch"></i>}</button>
                {warnings.map((e, index) => <Warning key={index} message={e}/>)}
                <div className="register">
                    <p>Chưa có tài khoản?</p>
                    <NavLink to="/register">Đăng ký ngay</NavLink>
                </div>
            </LoginForm>
        </LoginPage>
    )
}

export const LoginForm = styled.form`
    width: 400px;
    padding: 36px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.25);

    h3 {
        text-align: center;
        color: #2D6ED0;
        font-size: 32px;
    }

    .input {
        flex: 1;
        display: flex;
        height: 48px;
        border-bottom: 1px solid #ccc;

        .prefix {
            width: 48px;
            line-height: 48px;
            text-align: center;
        }

        input {
            width: 100%;
            font-size: 16px;
            border: 0;
            outline: 0;
            background: transparent;
        }
    }

    button {
        height: 48px;
        background-color: #2D6ED0;
        border: 0;
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        transition: linear 100ms;
    }

    button:hover {
        filter: brightness(1.2);
    }

    .register {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
`

export const LoginPage = styled.div`
    min-height: 100%;
    background: #F2F3F4;
    display: flex;
    justify-content: center;
    align-items: center;
`