import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../constants/Theme'
import { TextFieldStyle } from './TextField'

export default function ColorField({ colorRef, number, edit }) {
    const [color, setColor] = useState(colorRef.current)
    const [editMode, setEditMode] = useState(false)

    const openEdit = () => {
        setEditMode(true)
    }

    const closeEdit = () => {
        setEditMode(false)
    }

    const select = (value) => {
        colorRef.current = value
        setColor(value)
        closeEdit()
    } 

    return (
        <ColorFieldStyle>
            <div className="field">
                Màu sắc
            </div>
            {!editMode && <div className="color">
                <div className="circle" style={{ '--color': theme[color].main }}></div>
            </div>}
            {edit && <div className="edit" tabIndex={0} onBlur={closeEdit}>
                {!editMode && <div className="icon" onClick={openEdit}>
                    <i className="fas fa-edit"></i>
                </div>}

                {editMode && [...Array(number)].map((e, index) => <div className="color" onClick={() => select(index)} key={index}>
                    <div className="circle hover-enlarge" style={{ '--color': theme[index].main }}></div>
                </div>)}
            </div>}
        </ColorFieldStyle>
    )
}

const ColorFieldStyle = styled(TextFieldStyle)`
    height: fit-content;

    .color {
        height: var(--base-height);
        width: var(--base-height);
        display: flex;
        justify-content: center;
        align-items: center;

        .circle {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background-color: var(--color);
        }

        .circle.hover-enlarge {
            height: 24px;
            width: 24px;
            cursor: pointer;

            &:hover {
                height: 32px;
                width: 32px;                
            }
        }
    }

    .edit {
        flex: 1;
        flex-wrap: wrap;
    }
`