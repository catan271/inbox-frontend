import React, { useReducer } from 'react'
import styled from 'styled-components'
import { DialogReducer } from './Reducers'

export let dispatchDialogReference

export default function Dialog() {
    const [state, dispatch] = useReducer(DialogReducer, undefined)
    dispatchDialogReference = dispatch

    if (state) return (
        <DialogStyle>
            { state }
        </DialogStyle>
    ) 
    else return <></>
}

const DialogStyle = styled.div`
    position: fixed;
    z-index: 2;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`