import React from 'react'
import styled from 'styled-components'

import Header from './Header/Header'
import Main from './Main/Main'

export default function Home() {
    return (
        <HomeStyle>
            <Header/>
            <Main/>
        </HomeStyle>
    )
}

const HomeStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`