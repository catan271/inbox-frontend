import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../constants/Theme'
import Picker from './Picker'

export default function Input({ user, other, send }) {
    const [picker, setPicker] = useState(false)
    const input = useRef()

    useEffect(() => {
        const inputEle = input.current
        const listener = e => {
            if (e.code === 'Enter') {
                e.preventDefault()
                sendMessage()
            }
        }
        inputEle.addEventListener('keypress', listener)
        return () => {
            inputEle.removeEventListener('keypress', listener)
        }
        // eslint-disable-next-line
    }, [other])

    const sendMessage = () => {
        const content = input.current.innerText.trim()
        if (!content) return
        send(content)                
        input.current.innerText = ''
    }

    const handleEmojiClick = (emoji) => {
        input.current.append(emoji)
    }

    return (
        <InputStyle theme={{main: theme[user.color].main, secondary: theme[user.color].secondary}}>
            <div style={{position: 'relative'}} tabIndex={0} onBlur={() => setPicker(false)}>
                <div className="emoji-picker" onClick={() => setPicker(!picker)}>
                    <i className="fas fa-laugh-beam"/>
                </div>
                {picker && <Picker 
                    onSelection={handleEmojiClick}
                    style={{position: 'absolute', left: 0, bottom: '100%'}}
                    color={{main: theme[user.color].main, secondary: theme[user.color].secondary}}
                />}
            </div>
            <div ref={input} className="input" contentEditable={true}></div>
            <div className="send-button" onClick={sendMessage}><i className="fas fa-paper-plane"></i></div>
        </InputStyle>
    )
}

const InputStyle = styled.div`
    display: flex;
    margin: 20px;
    border-radius: 4px;
    min-height: 40px;
    max-height: 160px;
    background-color: #fff;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5);

    .send-button,
    .emoji-picker {
        height: 40px;
        width: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: ${props => props.theme.main};
    }

    .input {
        width: 100%;
        height: 100%;
        padding: 8px 0;
        line-height: 24px;
        overflow: auto;
        outline: none;
    }
`