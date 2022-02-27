import React, { useState } from 'react'
import styled from 'styled-components'

import { TextFieldStyle } from './TextField'

export default function SelectField({ field, contentRef, displayArr, edit }) {
    const [content, setContent] = useState(displayArr[contentRef.current])
    const [dropdown, setDropdown] = useState(false)

    const select = (value) => {
        contentRef.current = value
        setContent(displayArr[value])
    }

    const triggerDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <SelectFieldStyle>
            <div className="field">
                { field }
            </div>
            <div className="content">
                { content }
            </div>
            {edit && <div className="icon" onClick={triggerDropdown} tabIndex={0} onBlur={() => setDropdown(false)}>
                <i className="fas fa-caret-down"></i>
                {dropdown && <div className="dropdown">
                    {displayArr.map((e, index) => <div className="selection" onClick={() => {setDropdown(false); select(index)}} key={index}>
                        { e }
                    </div>)}
                </div>}
            </div>}
        </SelectFieldStyle>
    )
}

const SelectFieldStyle = styled(TextFieldStyle)`
    .icon {
        position: relative;
    }

    .dropdown {
        position: absolute;
        background-color: #fff;
        top: 100%;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
        right: 0;

        .selection {
            height: var(--base-height);
            padding: 0 12px;
            border-bottom: 1px solid #ccc;
            cursor: pointer;

            &:hover {
                background-color: #2D6ED0;
            }
        }
    }
`