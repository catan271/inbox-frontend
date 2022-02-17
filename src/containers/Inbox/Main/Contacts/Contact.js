import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../constants/Theme'

const timeUnit = [' phút', ' giờ', ' ngày', ' tuần', ' năm', ' thập kỉ']
const limit = [60, 60, 24, 7, (365.25 / 7), 10, Infinity]

export default function Contact({ chat, other, active, onClick }) {
    const newMessage = (chat.last.from === other._id && !chat.seen && !active)

    const calcTime = () => {
        const now = new Date()
        let t = Math.max((now.getTime() - new Date(chat.last.time).getTime()) / 60000, 1)
        for (let i = 0; i < 6; i++) {
            if (t < limit[i + 1]) return Math.trunc(t) + timeUnit[i]
            else t /= limit[i + 1]
        }
    }

    return (
        <ContactStyle onClick={onClick} theme={{main: theme[other.color].main, secondary: theme[other.color].secondary, active, newMessage}}>
            <div className="avatar">
                <img src={other.gender % 2? theme[other.color].female : theme[other.color].male} alt=""/>
            </div>
            <div className="text">
                <div className="line1">
                    <p className="name">{other.name}</p>
                    <p className="time">{calcTime()}</p>
                </div>
                <div className="line2">
                    <p>{chat.last.content}</p>
                </div>
            </div>
        </ContactStyle>
    )
}

const ContactStyle = styled.div`
    display: flex;
    height: 68px;
    border-radius: 8px;
    background-color: ${props => props.theme.active? props.theme.secondary : 'transparent'};

    .avatar {
        width: 68px;
        padding: 10px;

        img {
            width: 100%;
            border-radius: 50%;
        }
    }

    .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        overflow: hidden;

        p {
            font-weight: ${props => props.theme.newMessage? '600' : '400'};
        }

        .line1 {
            display: flex;
            justify-content: space-between;

            .time {
                font-size: 12px;
                color: #A2A3A6;
                margin-right: 6px;
            }
        }

        .line2 {
            font-size: 13px;
            color: ${props => props.theme.newMessage? props.theme.main : (props.theme.active? '#fff' : '#A2A3A6')};

            p {                
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.secondary};
        
        .text .line2 {
            color: #ffffff;
        }
    }
`