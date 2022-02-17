import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import AuthService from '../../../../apis/AuthService'

import localStorageKey from '../../../../constants/LocalStorageKeys'
import { data } from '../../Main/Main'

export default function Option({ mobileSearch }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        for (const prop of Object.getOwnPropertyNames(data)) {
            delete data[prop]
        }
        AuthService.logout()
            .finally(() => {
                window.localStorage.removeItem(localStorageKey.TOKEN);
                navigate('/login')
            })
    }

    return (
        <>
            <UtilStyle className={mobileSearch? 'mobile-hidden' : ''} theme={{open}} onClick={handleClick}>
                <i className="fas fa-caret-down"></i>
            </UtilStyle>
            {open && <DropdownStyle className={mobileSearch? 'mobile-hidden' : ''}>
                <div className="option">
                    <i className="fas fa-cog"/>
                    <p>Cài đặt</p>
                </div>
                <div className="option" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"/>
                    <p>Đăng xuất</p>
                </div>
            </DropdownStyle>}
        </>
    )
}

const DropdownStyle = styled.div`
    position: absolute;
    right: 8px;
    top: 50px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgb(0, 0, 0, 0.5);

    .option {
        display: flex;
        gap: 8px;
        align-items: center;
        border-radius: 8px;
        height: 40px;
        padding: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: linear 100ms;
    }

    .option:hover {
        background-color: #e7f3ff;
    }
`

export const UtilStyle = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 32px;
    background-color: #F0F2F5;
    color: ${props => props.theme.open? '#1876f2' : '#65676B'};
    line-height: 40px;
    text-align: center;
    cursor: pointer;
`
