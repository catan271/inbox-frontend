import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import ChatService from '../../../../apis/ChatService'
import { theme } from '../../../../constants/Theme'
import { UserContext } from '../../../../store/Provider'
import socket from '../../Socket/socket'
import { pushChat } from '../Contacts/ContactList'
import { data } from '../Main'
import Input from './Input/Input'
import { MyMessage, OtherMessage } from './Message'
import TimeSeparator from './TimeSeparator'

export let pushMessage

export default function Inbox() {
    const { id } = useParams()
    const [messages, setMessages] = useState()
    const other = useRef()
    const user = useContext(UserContext)
    const loading = useRef(false)

    useEffect(() => {
        if (id) {
            if (data[id]) {
                other.current = data[id].other
                setMessages(data[id].messages)
            }
            else ChatService.getChat(id)
                .then((res) => {
                    data[id] = {
                        other: res.data.other,
                        messages: res.data.messages.map(each => {
                            each.time = new Date(each.time)
                            return each
                        })
                    }
                    other.current = res.data.other
                    setMessages(res.data.messages)
                })
            loading.current = false
        }
    }, [id])

    const handleScroll = (e) => {
        const scrollBottom = (e.target.scrollTop - e.target.offsetHeight + e.target.scrollHeight)
        if (scrollBottom < 10 && !loading.current) {
            loading.current = true
            ChatService.getChat(id, messages.length)
                .then((res) => {
                    setMessages(messages => [
                        ...messages,
                        ...res.data.messages.map(each => {
                            each.time = new Date(each.time)
                            return each
                        })
                    ])
                    if (res.data.messages.length) loading.current = false;
                })
                .catch(console.log)
        }
    }

    pushMessage = (from) => {
        if (id === from) setMessages(data[id].messages)
    }

    const send = (content) => {
        socket.emit('messageSent', {
            to: other.current._id,
            content
        }, console.log)

        const time = new Date()

        pushChat({
            other: other.current,
            chat: {
                last: {
                    from: user._id,
                    content,
                    time
                },
                seen: false
            }
        })
        data[id].messages = [
            {
                from: user._id,
                content,
                time
            },
            ...data[id].messages
        ]
        setMessages(data[id].messages)
    }

    if (id && messages && other.current && user._id) {
        const myAvatar = user.gender % 2? theme[user.color].female : theme[user.color].male
        const otherAvatar = other.current.gender % 2? theme[other.current.color].female : theme[other.current.color].male
        const myColor = theme[user.color].main
        const otherColor = theme[other.current.color].main

        const now = new Date()

        return (
            <InboxStyle>
                <div className="header">
                    <div className="avatar">
                        <img src={otherAvatar} alt=""/>
                    </div>
                    <p className="name">{other.current.name}</p>
                </div>
                <div className="inbox" onScroll={handleScroll}>
                    {messages.map((each, index) => {
                        each.displayTime = index === messages.length - 1 || messages[index].time.getTime() - messages[index + 1].time.getTime() > 600000
                        const first = index === messages.length - 1 || messages[index].from !== messages[index + 1].from || each.displayTime
                        const last = index === 0 || messages[index].from !== messages[index - 1].from || messages[index - 1].displayTime

                        return (
                            <React.Fragment key={index}>
                                {each.from === user._id? 
                                <MyMessage 
                                    first={first} 
                                    last={last}
                                    displayTime={each.displayTime}
                                    time={each.time}
                                    avatar={myAvatar} 
                                    color={myColor} 
                                    content={each.content} 
                                /> : 
                                <OtherMessage 
                                    first={first} 
                                    last={last}
                                    displayTime={each.displayTime}
                                    time={each.time}
                                    avatar={otherAvatar} 
                                    color={otherColor} 
                                    content={each.content} 
                                    key={index}
                                />}
                                {each.displayTime && <TimeSeparator time={each.time} color={theme[user.color].secondary} now={now}/>}
                            </React.Fragment>
                        )
                    })}
                </div>
                <Input user={user} other={other.current} send={send}/>
            </InboxStyle>
    )} else return <div className="mobile-hidden" style={{background: 'aliceblue', flex: 1}}></div>
}

const InboxStyle = styled.div`
    flex: 1;
    height: 100%;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 15px;

    .header {
        height: 56px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
        background-color: #fff;
        display: flex;
        align-items: center;
        z-index: 1;

        .avatar {
            height: 100%;
            width: 56px;
            padding: 8px;

            img {
                width: 100%;
                border-radius: 50%;
            }
        }

        .name {
            font-size: 16px;
            font-weight: 500;
        }
    }

    .inbox {
        display: flex;
        flex-direction: column-reverse;
        gap: 2px;
        flex: 1;
        padding: 10px;
        overflow-y: scroll;
    }
`