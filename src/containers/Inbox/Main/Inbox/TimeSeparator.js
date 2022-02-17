import React from 'react'
import styled from 'styled-components'

export default function TimeSeparator({ time, color, now }) {
    let timeString = `${time.getHours()}:${('0' + time.getMinutes().toString()).slice(-2)}`

    if (time.getDate() !== now.getDate() || time.getMonth() !== now.getMonth() || time.getFullYear() !== now.getFullYear()) {
        if (time.getFullYear() !== now.getFullYear()) timeString += ` ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        else timeString += ` ${time.getDate()}/${time.getMonth() + 1}`
    }
    return (
        <TimeStyle theme={{color}}>
            <div className="line"/>
            <div className="time">
                {timeString}
            </div>
            <div className="line"/>
        </TimeStyle>
    )
}

const TimeStyle = styled.div`
    padding: 8px 60px;
    width: 100%;
    display: flex;
    align-items: center;
    align-self: center;

    .line {
        flex: 1;
        height: 1px;
        max-height: 0.5px;
        background-color: ${props => props.theme.color}
    }

    .time {
        font-size: 12px;
        border-radius: 40px;
        background-color: ${props => props.theme.color};
        padding: 0 8px;
    }
`