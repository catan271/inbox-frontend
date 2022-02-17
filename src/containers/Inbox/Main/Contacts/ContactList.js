import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'

import ChatService from '../../../../apis/ChatService'
import socket from '../../Socket/socket'
import Contact from './Contact'

export let pushChat

let focus = true

window.onfocus = () => {
    focus = true
}

window.onblur = () => {
    focus = false
}

export default function ContactList() {
    const [chats, setChats] = useState([])
    const [reload, triggerReload] = useState(false)
    const [active, setActive] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const loading = useRef()

    useEffect(() => {
        ChatService.getAllChat()
            .then((res) => {
                setChats(res.data)
                triggerReload(true)
            })
    }, [])

    useEffect(() => {
        chats.forEach((each, index) => {
            if (each.other._id === id) handleClick(index);
        })
        const countNew = chats.reduce((count, each) => (each.other._id === each.chat.last.from && !each.chat.seen? count + 1 : count), 0)
        document.title = countNew? `(${countNew}) Inbox` : 'Inbox'
    // eslint-disable-next-line
    }, [id, reload])
    
    const handleClick = (index) => {
        const { chat, other } = chats[index]
        
        if (focus) {
            socket.emit('seen', other._id)

            setChats(chats => {
                if (chat.last.from === other._id) chats[index].chat.seen = true;
                return [...chats]
            })
        }
        
        if (index !== active) setActive(index)
        if (other._id !== id) navigate('/inbox/' + other._id)
    }

    const handleScroll = (e) => {
        const scrollBottom = (e.target.scrollTop + e.target.offsetHeight - e.target.scrollHeight)
        if (scrollBottom > -10 && !loading.current) {
            loading.current = true
            ChatService.getAllChat(chats.length)
                .then(res => {
                    setChats([...chats, ...res.data])
                    if (res.data.length) loading.current = false
                })
                .catch(console.log)
        }
    }

    pushChat = ({ other, chat }) => {
        if (id === chat.last.from && focus) {
            chat.seen = true
            socket.emit('seen', other._id)
        } else {
            chat.seen = false
        }
        setChats(chats => [
            {
                other,
                chat
            },
            ...chats.filter(each => each.other._id !== other._id)
        ])
        triggerReload(!reload)
    }

    return (
        <ContactListStyle className={`${id? 'mobile-hidden' : ''}`} onScroll={handleScroll}>
            {chats.map((each, index) => <Contact key={index} onClick={() => handleClick(index)} active={index === active} chat={each.chat} other={each.other}/>)}
        </ContactListStyle>
    )
}

const ContactListStyle = styled.div`
    height: 100%;
    width: 360px;
    max-width: 35%;
    min-width: 240px;
    border-right: 1px solid #eee;
    padding: 10px;
    overflow-y: overlay;

    @media screen and (max-width: 767px) {
        width: 100%;
        max-width: 100%;
    }
`