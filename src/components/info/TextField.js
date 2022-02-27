import React, { useRef, useState } from 'react'
import styled from 'styled-components'

export default function TextField({ field, contentRef, type, edit }) {
    const [content, setContent] = useState(contentRef.current)
    const [editMode, setEditMode] = useState(false)
    const input = useRef()

    const triggerEdit = () => {
        setEditMode(!editMode)
    }

    const save = () => {
        const value = input.current.value.trim()
        
        if (value) {
            contentRef.current = value
            setContent(value)
        }

        setEditMode(false)
    }

    return (
        <TextFieldStyle>
            <div className="field">
                { field }
            </div>
            {editMode? 
                <form className="edit" onSubmit={(e) => {e.preventDefault(); save()}}>
                    <input type={type} autoFocus={true} placeholder={content} ref={input}/>
                    <div className="icon" onClick={save}>
                        <i className="fas fa-check" style={{ color: 'green'}}></i>
                    </div>
                    <div className="icon" onClick={triggerEdit}>
                        <i className="fas fa-times" style={{ color: '#EE0E0E' }}></i>
                    </div>
                </form>
            :
                <>
                    <div className="content">
                        { content }
                    </div>
                    {edit && <div className="icon" onClick={triggerEdit}>
                        <i className="fas fa-edit"></i>
                    </div>}
                </>
            }
        </TextFieldStyle>
    )
}

export const TextFieldStyle = styled.div`
    height: var(--base-height);
    line-height: var(--base-height);
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ccc;

    .field {
        width: 120px;
        min-width: 120px;
        font-weight: 600;
    }

    .icon {
        margin-left: auto;
        width: var(--base-height);
        text-align: center;
        color: #65676B;
        cursor: pointer;

        &:hover {
            color: #000;
        }
    }

    .content {
        overflow: hidden;
    }

    .edit {
        display: flex;

        input {
            border: 0;
            outline: none;
            flex: 1;
            width: 100%;
            font-size: inherit;
            font-family: inherit;
        }
    }
`