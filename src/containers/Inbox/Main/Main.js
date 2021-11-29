import React from 'react'
import styled from 'styled-components'
import ContactList from './Contacts/ContactList'
import Inbox from './Inbox/Inbox'

export const data = {}

export default function Main() {
    return (
        <MainStyle>
            <ContactList/>
            <Inbox/>
        </MainStyle>
    )
}

const MainStyle = styled.div`
    flex: 1;
    display: flex;
    overflow-y: clip;
`