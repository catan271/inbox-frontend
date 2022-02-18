import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import UserService from '../../../../apis/UserService'
import { theme } from '../../../../constants/Theme'

export default function Search({ mobileSearch, setMobileSearch }) {
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState()
    const timeout = useRef()
    const navigate = useNavigate()
    const input = useRef()

    useEffect(() => {
        if (mobileSearch) input.current.focus()
    })

    const doSearch = (search) => {
        setLoading(true)
        UserService.find(search)
            .then(res => {
                setResults(res.data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        if (!loading && search) doSearch(search)
    }

    const handleInput = (e) => {
        const search = e.target.value;
        window.clearTimeout(timeout.current)
        if (search && !loading) {
            timeout.current = setTimeout(() => {
                doSearch(search)
            }, 1000)
        }
    }

    const handleClick = (id) => {
        navigate('/inbox/' + id)
    }

    const renderResult = () => {
        if (results.length) {
            return results.map((each, index) =>(
                <ResultStyle onMouseDown={() => handleClick(each._id)} theme={{color: theme[each.color].secondary}} key={index}>
                    <div className="avatar">
                        <img src={each.gender % 2? theme[each.color].female : theme[each.color].male} alt=""/>
                    </div>
                    <div className="name">{each.name}</div>
                </ResultStyle>
            ))
        }
        return (
            <div className="no-result">Không tìm thấy!</div>
        )
    }

    const triggerMobileSearch = () => {
        setMobileSearch(state => !state)
    }

    return (        
        <SearchStyle onSubmit={handleSubmit} theme={{ mobileSearch }} autoComplete="off" onBlur={() => {setResults(undefined); triggerMobileSearch()}}>
            <button className={`icon mobile ${mobileSearch? '' : 'mobile-hidden'}`} style={{marginRight: 6}}><i className="fas fa-arrow-left"></i></button>
            <input ref={input} className={mobileSearch? '' : 'mobile-hidden'} name="search" onInput={handleInput} type="text" placeholder="Nhập liên hệ muốn tìm"></input>
            <button type="submit" className={`icon ${mobileSearch? '' : 'mobile-hidden'}`}>{loading? <i className="fas fa-spin-1s fa-compass"></i> : <i className="fas fa-search"></i>}</button>
            {!mobileSearch && <button className="icon mobile" onClick={triggerMobileSearch}><i className="fas fa-search"></i></button>}
            {results && <div className="results">{renderResult()}</div>}
        </SearchStyle>
    )
}

const SearchStyle = styled.form`
    display: flex;
    align-items: center;
    background: #F0F2F5;
    border-radius: 32px;
    padding: 0 12px;
    position: relative; 

    @media screen and (max-width: 768px){
        width: ${props => props.theme.mobileSearch? '100%' : 'unset'};

        input {
            flex: 1;
        }
    }

    input {
        width: 300px;
        flex: 1;
        outline: none;
        border: 0;
        background: transparent;
    }

    .icon {
        color: #65676B;
        cursor: pointer;
        border: 0;
        background: transparent;
        font-size: 20px;
    }

    .results {
        position: absolute;
        top: 110%; left: 0;
        background-color: #fff;
        box-shadow: 0 0 2px 0 rgb(0, 0, 0, 0.5);
        padding: 4px;
        border-radius: 4px;
        width: 100%;

        .no-result {
            height: 48px;
            line-height: 48px;
            text-align: center;
        }
    }
`
const ResultStyle = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    
    .avatar {
        height: 100%;
        width: 48px;
        padding: 4px;
        
        img {
            height: 100%;
            border-radius: 50%;
        }
    }

    .name {
        padding: 0 8px;
    }

    &:hover {
        background-color: ${props => props.theme.color}
    }
`