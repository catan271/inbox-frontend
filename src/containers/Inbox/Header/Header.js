import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import UserService from '../../../apis/UserService'
import localStorageKey from '../../../constants/LocalStorageKeys'

import { theme } from '../../../constants/Theme'
import { setUser } from '../../../store/Actions'
import { UserContext } from '../../../store/Provider'
import socket from '../Socket/socket'
import Notification from './utils/Notification'
import Option from './utils/Option'
import Search from './utils/Search'

export default function Header() {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [mobileSearch, setMobileSearch] = useState(false)

    useEffect(() => {
        
        const token = window.localStorage.getItem(localStorageKey.TOKEN)

        socket.emit('join', token, (e) => {
            console.log(e)
        })
        if (!user._id) {
            UserService.getProfile()
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        window.localStorage.removeItem(localStorageKey.TOKEN)
                        navigate('/login')
                    }
                })
        }
    // eslint-disable-next-line
    }, [])


    return (
        user._id? <HeaderStyle theme={{main: theme[user.color].main, secondary: theme[user.color].secondary}}>
            {!mobileSearch && <div className="left">
                <h1 className="app-name">INBOX</h1>
            </div>}
            <div className="right">
                <Search mobileSearch={mobileSearch} setMobileSearch={setMobileSearch}/>
                {!mobileSearch && <>
                    <div className="info">
                        <div className="avatar"><img src={user.gender % 2? theme[user.color].female : theme[user.color].male} alt=""/></div>
                        <div className="name mobile-425-hidden">{user.name}</div>
                    </div>
                    <Notification/>
                    <Option/>
                </>}
            </div>
        </HeaderStyle> : <HeaderStyle></HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    height: 52px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    z-index: 2;

    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;

        h1.app-name {
            font-size: 30px;
            color: ${props => props.theme.main}
        }
    }

    .right {
        display: flex;
        padding: 6px 12px;
        gap: 6px;
        justify-content: flex-end;
        /* width: fit-content !important; */
        flex: 1;

        .info {
            display: flex;
            align-items: center;
            background-color: ${props => props.theme.secondary};
            padding: 4px;
            border-radius: 32px;
            overflow: clip;

            .avatar {
                height: 100%;
                img {
                    border-radius: 32px;
                    object-fit: 32px;
                    height: 32px;
                }
            }

            .name {
                padding: 0 12px;
                color: #fff;
                white-space: nowrap;
            }
        }
    }
`