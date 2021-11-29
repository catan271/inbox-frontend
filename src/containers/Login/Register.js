import React, { useState } from 'react'
import styled from 'styled-components'

import Warning from '../../components/auth/Warning'
import { theme } from '../../constants/Theme'
import { LoginForm, LoginPage } from './Login'
import AuthService from '../../apis/AuthService'
import { useNavigate } from 'react-router'
import { setUser } from '../../store/Actions'
import localStorageKey from '../../constants/LocalStorageKeys'

const genderWord = ['Nam', 'Nữ', 'Khác', '']

export default function Register() {
    const [warnings, setWarnings] = useState([])
    const [color, setColor] = useState(0)
    const [clickedDropdown, setClickedDropdown] = useState(false)
    const [gender, setGender] = useState(3)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        setWarnings([])
        setLoading(true)
        const familyName = e.target.familyName.value
        const givenName = e.target.givenName.value
        const username = e.target.username.value
        const password = e.target.password.value
        const repassword = e.target.repassword.value
        const error = []
        if (!familyName) {
            error.push('Vui lòng nhập họ')
        }
        if (!givenName) {
            error.push('Vui lòng nhập tên')
        }
        if (!username) {
            error.push('Vui lòng nhập tên đăng nhập')
        }
        if (!password) {
            error.push('Vui lòng nhập mật khẩu')
        }
        if (!repassword) {
            error.push('Vui lòng nhập lại mật khẩu')
        }
        if (repassword !== password) {
            error.push('Mật khẩu nhập lại không chính xác')
        }
        if (gender === 3) {
            error.push('Vui lòng chọn giới tính')
        }
        if (error.length) {
            setWarnings(error)
            setLoading(false)
        } else {
            AuthService.register({ familyName, givenName, username, password, gender, color })
                .then((res) => {
                    console.log(res)
                    setLoading(false)
                    setUser(res.data.user)
                    window.localStorage.setItem(localStorageKey.TOKEN, res.data.token)
                    navigate('/inbox')
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err.response)
                    setWarnings(['Đăng ký không thành công'])
                })
        }
    }

    return(
        <RegisterPage>
            <RegisterForm onSubmit={handleRegister}>
                <h3>Đăng ký</h3>
                <div className="inputName">
                    <div className="input">
                        <div className="prefix"><i className="fas fa-address-book"></i></div>
                        <input type="text" placeholder="Họ" name="familyName"></input>
                    </div>
                    <div id="gap"></div>
                    <div className="input">
                        <div className="prefix"><i className="fas fa-address-book"></i></div>
                        <input type="text" placeholder="Tên" name="givenName"></input>
                    </div>
                </div>
                <div className="input">
                    <div className="prefix"><i className="fas fa-user"></i></div>
                    <input type="text" placeholder="Tên đăng nhập" name="username"></input>
                </div>
                <div className="input">
                    <div className="prefix"><i className="fas fa-key"></i></div>
                    <input type="password" placeholder="Mật khẩu" name="password"></input>
                </div>
                <div className="input">
                    <div className="prefix"><i className="fas fa-key"></i></div>
                    <input type="password" placeholder="Nhập lại mật khẩu" name="repassword"></input>
                </div>
                <div className="input">
                    <div className="prefix">
                        <i className="fas fa-male"></i>
                        <i className="fas fa-female"></i>
                    </div>
                    <input type="text" placeholder="Giới tính" readOnly="readonly" value={genderWord[gender]} name="gender"></input>
                    <div className="prefix" id="dropdown-gender" tabIndex="0" onClick={() => setClickedDropdown(!clickedDropdown)} onBlur={() => setClickedDropdown(false)}>
                        <i className="fas fa-sort-down"></i>
                        {clickedDropdown && <div className="options">
                            <div className="option" onMouseDown={() => setGender(0)}>Nam</div>
                            <div className="option" onMouseDown={() => setGender(1)}>Nữ</div>  
                            <div className="option" onMouseDown={() => setGender(2)}>Khác</div>         
                        </div>}
                    </div>
                </div>
                <div className="chooseColor">
                    <p>Chọn màu chủ đề</p>
                    <div className="colorBar">
                        {theme.map((item, index) =>  
                            <Color style={{backgroundColor: item.main}} 
                                   chosen={index === color}
                                   key={index} 
                                   onClick={() => setColor(index)}
                            />
                        )}
                    </div>
                </div>
                <button type="submit">Đăng ký{loading && <i className="fas fa-spin-1s fa-circle-notch"></i>}</button>
                {warnings.map((e, index) => <Warning key={index} message={e}/>)}

            </RegisterForm>
        </RegisterPage>
    )
}

function Color({ chosen, style, onClick}) {
    return (
        <div className="color">
            <div className= {chosen ? "colorClicked" : "colorDefault"}
                style={style}
                onClick={onClick}
            >

            </div>
        </div>
    )
}

const RegisterForm = styled(LoginForm)`
    .inputName {
        display: flex;
        flex-direction: row;
        height: 49px;

        #gap {
            flex-grow: 1;
        }

        .input {
            flex-grow: 8;

            .prefix {
                width: 60px;
            }
        }
    }

    .colorBar {
        display: flex;
        height: 32px;
        margin-top: 4px;

        .color {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .colorDefault {
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }

            .colorDefault:hover {
                width: 32px;
                height: 32px;
            }

            .colorClicked {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
    }

    #dropdown-gender {
        position: relative;
        display: inline-block;
        border-radius: 4px;

        .options {
            position: absolute;
            top: 100%;
            right: 0;
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
            width: 100px;
            background-color: #fff;
            z-index: 2;

            .option {
                text-align: center;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }

            .option:hover{
                background-color: #2D6ED0;
                color: white;
            }
        }  
    }
`

const RegisterPage = styled(LoginPage)`
    padding: 60px;
    height: fit-content;
`