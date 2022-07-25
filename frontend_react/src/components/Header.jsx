import { useContext } from 'react'
import { AuthContext } from '../utils/auth'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeaderStyled = styled.header`
padding:0 2em;
    display: flex;
    justify-content: space-between;
    height: 100px;
    border-bottom: solid;
    >a{
        text-decoration:none;
        color:black;
        display: flex;
        gap:1em;
        text-align: center;
        align-items: center;
        >img{height:70%;}
        >hgroup{
            >*{
                margin:0;
                font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
            >h1{font-size:2.4em;}
            >h2{
                font-weight: normal;
                font-size: 1.2em;
            }
        }
    }
    >menu{
    }
    >nav,>menu{
        list-style: none;
        display: flex;
        gap: 1em;
        align-self:center;
        a{text-decoration:none;color:black;
            &.active{font-weight:bolder;text-decoration:underline;}
        }
    }
`


export default function Header() {
  const { token } = useContext(AuthContext)

  return (
        <HeaderStyled>
            <nav>
                {token 
                && <>
                    <li>
                        <Link to="/sauces">ALL SAUCES</Link>
                    </li>
                    <li>
                        <Link to="/new-sauce">ADD SAUCES</Link>
                    </li>
                </>}
            </nav>
            <Link to="/">
                <img src="logo.png" alt="logo sauces piiquante" />
                <hgroup>
                    <h1>HOT TAKES</h1>
                    <h2>THE WEB'S BEST HOT SAUCE REVIEWS</h2>
                </hgroup>
            </Link>
            <menu>
                {!token
                && <>
                    <li><Link to="/signup">SIGN UP</Link></li>
                    <li><Link to="/login">LOGIN</Link></li>
                </>
                }
                {token && <li><Link to="/logout">LOGOUT</Link></li>}
            </menu>
        </HeaderStyled>
    )
}
