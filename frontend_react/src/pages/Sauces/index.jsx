import { useContext } from 'react'
import { AuthContext } from '../../utils/auth'
import { Navigate} from 'react-router-dom'


export default function Sauces({t}) {
  const { token } = useContext(AuthContext)
  console.log("sauces");
  console.log(token);
  if(!token)return <Navigate to="/" push />
  return (
    <div>Sauces</div>
  )
}
