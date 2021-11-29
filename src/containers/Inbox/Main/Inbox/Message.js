import React from 'react'
import styled from 'styled-components'

export function MyMessage({ color, content, first, last, avatar}) {
    return (
        <MyMessageStyle theme={{color}}>
            <div className={`content${first? ' first' : ''}${last? ' last' : ''}`}>{content}</div>
            <div className="avatar">
                {first && <img src={avatar} alt=""/>}
            </div>
        </MyMessageStyle>
    )
}

const MyMessageStyle = styled.div`
    display: flex;
    max-width: 70%;
    width: fit-content;
    position: relative;
    align-self: flex-end;

    .content {
        min-height: 40px;
        border-radius: 20px 4px 4px 20px;
        background-color: ${props => props.theme.color};
        padding: 8px 20px 8px 20px;
        line-height: 24px;
        color: #fff;
        margin: 0 60px 0 20px;
        position: relative;
    }

    .content.first {
        border-top-right-radius: 0;
    }

    .content.last {
        border-bottom-right-radius: 20px;
    }

    .content.first:before {
        content: '';
        position: absolute;
        top: 0;
        left: 100%;
        height: 20px;
        width: 40px;
        border-top-left-radius: 20px;
        background: transparent;
        box-shadow: -20px 0 0 0 ${props => props.theme.color};
    }

    .avatar {
        position: absolute;
        top: 0;
        right: 0;
        height: 40px;
        width: 40px;
        
        img {
            width: 100%;
            border-radius: 50%;
        }
    }
`

export function OtherMessage({ color, content, first, last, avatar}) {
    return (
        <OtherMessageStyle theme={{color}}>
            <div className="avatar">
                {first && <img src={avatar} alt=""/>}
            </div>
            <div className={`content${first? ' first': ''}${last? ' last' : ''}`}>{content}</div>
        </OtherMessageStyle>
    )
}

const OtherMessageStyle = styled(MyMessageStyle)`
    align-self: flex-start;

    .content {
        margin: 0 20px 0 60px;
        border-radius: 4px 20px 20px 4px;
    }

    .content.last {
        border-bottom-left-radius: 20px;
    }

    .content.first {
        border-radius: 0 20px 20px 8px;
    }

    .content.first::before {
        right: 100%;
        left: unset;
        border-top-left-radius: 0;
        border-top-right-radius: 20px;
        box-shadow: 20px 0 0 0 ${props => props.theme.color};
    }

    .avatar {
        left: 0;
    }
` 