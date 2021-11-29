import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './assets/fontawesome-free-5.15.3-web/fontawesome-free-5.15.3-web/css/all.min.css'
import localStorageKey from './constants/LocalStorageKeys'

import Home from './containers/Inbox/Home'
import Login from './containers/Login/Login'
import Register from './containers/Login/Register'
import Provider from './store/Provider'

export default function App() {
    return(
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route exact={true} path='/'
                        element={window.localStorage.getItem(localStorageKey.TOKEN) ? <Navigate to="/inbox"/> : <Navigate to='/login'/>}
                    />
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/inbox' element={<Home/>}/>
                    <Route path='/inbox/:id' element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}