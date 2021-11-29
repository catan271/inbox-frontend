import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../constants/Theme'

export default function Contact({ chat, other, active, onClick }) {
    const newMessage = (chat.last.from === other._id && !chat.seen)

    return (
        <ContactStyle onClick={onClick} theme={{main: theme[other.color].main, secondary: theme[other.color].secondary, active, newMessage}}>
            <div className="avatar">
                <img src={other.gender % 2? theme[other.color].female : theme[other.color].male} alt=""/>
            </div>
            <div className="text">
                <div className="line1">
                    <p className="name">{other.name}</p>
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
        overflow: clip;

        p {
            font-weight: ${props => props.theme.newMessage? '600' : '400'};
        }

        .line2 {
            font-size: 13px;
            color: ${props => props.theme.newMessage? props.theme.main : (props.theme.active? '#fff' : '#A2A3A6')};

            p {                
                white-space: nowrap;
                overflow: clip;
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