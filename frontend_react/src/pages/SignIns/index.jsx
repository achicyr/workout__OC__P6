import { useState, useContext } from 'react'
import {BrowserRouter,Routes,Route,Link,useParams, Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AuthContext } from '../../utils/auth'

const FormStyled = styled.form`
    margin: auto;
    width:750px;
    label,>input{font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}

    >fieldset{
      padding:0;
      border:none;
      >label{padding:2px;display: inline-block;}
      >input{
        display: block;
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 2px;
        &:valid:not(:placeholder-shown){background:#00800059;}
        &:invalid{background:orange;}
      }
    }
    >input[type="submit"]{
      padding:12px 16px;
      border-radius:4px;
      border:none;
      font-size:14px;
      box-shadow:none;
      background:rgba(0,0,0,.12);
      cursor:pointer;
      &:not(:disabled){
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12);
        color:white;
        background: #673ab7;
        cursor:pointer;
      }
    }
`

export default function SignIns() {

  
  let [validSubmit, setValidSubmit] = useState(true)
  , submitValue = document.location.pathname.replace('/','').toUpperCase()
  , { setToken, token } = useContext(AuthContext)
  , handleChange = (e) => { 
    setValidSubmit(
      document.querySelector('#email').validity.valid
      && document.querySelector('#password').validity.valid
      && document.querySelector('#email').value!==""
      && document.querySelector('#password').value!==""
        ? false
        :true
    )
  }
  , handleSubmit = e => { 
    e.preventDefault()
    // console.log("localhost:3000/api/auth/login")
    let body = {}
    Array.from(new FormData(document.querySelector('form'))).forEach(arr=>{body[arr[0]]=arr[1]})
    // console.log(body);
    body = JSON.stringify(body)
    // console.log(body);
    fetch("http://localhost:3000/api/auth/login",{
      method: "POST"
      , mode: "cors"
      , headers:{"Content-type":"application/json"}
      , body
    })
    .then((json) => json.json())
    .then((resp) => {
      // <Navigate to="/sauces" />
      if(resp.token)setToken(resp.token)
    })
    .catch(e=>{console.log(e)})
   }
  if(token)return <Navigate to="/sauces" push />
  return (
    <FormStyled method="POST" onSubmit={handleSubmit}>
      {/* (fieldset*2>(label{Email}+input[name="email"]))+input[sumbit]{LOGIN} */}
      <fieldset>
        <label htmlFor="email">Email</label>
        <input placeholder="exemple@email.com" type="email" name="email" id="email" onChange={(e)=>{handleChange(e)}} />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input placeholder="Votre mot de passe" pattern=".{3,}" type="password" name="password"  id="password" onChange={(e)=>{handleChange(e)}} />
      </fieldset>
      <input type="submit" value={submitValue} disabled={validSubmit} />
    </FormStyled>
  )
}
