import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'

import ChatService from '../../../../apis/ChatService'
import Contact from './Contact'

export let pushChat

export default function ContactList() {
    const [chats, setChats] = useState([])
    const [load, setLoad] = useState(false)
    const [active, setActive] = useState()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        ChatService.getAllChat()
            .then((res) => {
                setChats(res.data)
                setLoad(true)
            })
    }, [])

    useEffect(() => {
        chats.forEach((each, index) => {
            if (each.other._id === id) handleClick(index);
        })
    // eslint-disable-next-line
    }, [id, load])
    
    const handleClick = (index) => {
        setChats(chats => {
            const { chat, other } = chats[index]
            if (chat.last.from === other._id) chats[index].chat.seen = true;
            return [...chats]
        })
        if (index !== active) setActive(index)
        if (chats[index].other._id !== id) navigate('/inbox/' + chats[index].other._id)
    }

    pushChat = ({ other, chat }) => {
        if (id === other._id) chat.seen = true
        setChats(chats => [
            {
                other,
                chat
            },
            ...chats.filter(each => each.other._id !== other._id)
        ])
        setLoad(!load)
    }

    return (
        <ContactListStyle>
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
`