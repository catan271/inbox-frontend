import React, { useRef } from 'react'
import styled from 'styled-components' 
import UserService from '../../apis/UserService'

import { theme } from '../../constants/Theme'
import { removeDialog, setUser } from '../../store/Actions'
import ColorField from './ColorField'
import SelectField from './SelectField'
import TextField from './TextField'

export default function InfoWindow({ user, edit }) {
    const backgroundColor = theme[user.color].secondary
    const imgSrc = user.gender % 2? theme[user.color].female : theme[user.color].male
    const givenName = useRef(user.givenName)
    const familyName = useRef(user.familyName)
    const age = useRef(user.age)
    const gender = useRef(user.gender)
    const color = useRef(user.color)

    const close = () => {
        removeDialog()
    }

    const save = () => {
        const body = {
            givenName: givenName.current,
            familyName: familyName.current,
            age: age.current,
            gender: gender.current,
            color: color.current
        }

        UserService.update(body)
            .then((res) => {
                setUser(res.data)
                close()
            })
            .catch(console.log)
    }

    return (
        <InfoWindowStyle className="info-window">
            <div className="wall" style={{ backgroundColor }}>
                <div className="icon-close" onClick={close}>
                    <i className="fas fa-times"></i>
                </div>
                <img className="avatar" src={imgSrc} alt=""/>
            </div>
            <div className="info">
                <TextField field="Tên" contentRef={givenName} type="text" edit={edit}/>
                <TextField field="Họ" contentRef={familyName} type="text" edit={edit}/>
                <TextField field="Tuổi" contentRef={age} type="number" edit={edit}/>
                <SelectField field="Giới tính" contentRef={gender} displayArr={['Nam', 'Nữ', 'Khác']} edit={edit}/>
                <ColorField colorRef={color} number={6} edit={edit}/>
                {edit && <div className="button" onClick={save} style={{ '--color': theme[user.color].main }}>
                    Lưu thay đổi
                </div>}
            </div>
        </InfoWindowStyle>
    )
}

const InfoWindowStyle = styled.div`
    width: 420px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 600px;
    max-width: 90%;

    .wall {
        height: 160px;
        position: relative;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .icon-close {
            --size: 32px;
            height: var(--size);
            width: var(--size);
            line-height: var(--size);
            text-align: center;
            position: absolute;
            top: 0;
            right: 0;
            color: #fff;
            cursor: pointer;

            &:hover {
                color: #EE0E0E;
            }
        }

        .avatar {
            --img-size: 128px;
            box-sizing: content-box;
            height: var(--img-size);
            width: var(--img-size);
            border-radius: 50%;
            border: 4px solid #fff;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .info {
        --base-height: 40px;
        margin-top: 40px;
        padding: 40px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .button {
            height: 48px;
            line-height: 48px;
            width: 100%;
            color: #fff;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            margin-top: auto;
            background-color: var(--color);
            border-radius: 6px;
        }
    }
`