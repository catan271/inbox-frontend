import React, { useState } from 'react'
import styled from 'styled-components'

import emoji from './emoji-data.json'
emoji[0].emoji = JSON.parse(window.localStorage.getItem('recent-emoji')) || []

export default function Picker({ onSelection, color, style }) {
    const [tab, setTab] = useState(0)

    const handleEmojiClick = (chosenEmoji) => {
        const recent = emoji[0].emoji
        const oldIndex = recent.indexOf(chosenEmoji)
        if (oldIndex !== -1) recent.splice(oldIndex, 1)
        recent.unshift(chosenEmoji)
        recent.splice(100)
        window.localStorage.setItem('recent-emoji', JSON.stringify(recent))
        if (typeof onSelection === 'function') onSelection(chosenEmoji)
    }

    return (
        <PickerStyle style={style} theme={{main: color.main, secondary: color.secondary}}>
            <div className="tabs">
                {emoji.map((group, index) => (
                    <div onClick={() => setTab(index)}
                        title={group.title}
                        className={"tab" + (tab === index? " active": "")} 
                        key={index}
                    >
                        <i className={group.fa}/>
                    </div>
                ))}
            </div>
            <div className="emojis">
                {emoji[tab].emoji.map((emoji) => (
                    <div className="emoji" key={emoji} onClick={() => handleEmojiClick(emoji)}>
                        {emoji}
                    </div>
                ))}
            </div>
        </PickerStyle>
    )
}

const PickerStyle = styled.div`
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 4px;

    .tabs {
        height: 30px;
        width: 300px;
        display: flex;
        color: #65676B;

        .tab {
            cursor: pointer;
            flex: 1;
            line-height: 30px;
            text-align: center;
        }

        .tab:hover {
            background-color: ${props => props.theme.secondary};
        }

        .tab.active {
            box-shadow: inset 0 -4px 0 0 ${props => props.theme.main};
        }
    }

    .emojis {
        font-size: 24px;
        display: grid;
        grid-template-columns: repeat(8, 35px);
        height: 320px;
        width: 100%;
        padding: 0 10px;
        overflow-y: overlay;
        align-content: flex-start;

        .emoji {
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 50%;
            cursor: pointer;
        }

        .emoji:hover {
            background-color: ${props => props.theme.secondary}            
        }
    }
`