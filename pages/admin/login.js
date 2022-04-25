import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import {login as loginto} from '../../store/apiCalls'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        loginto(dispatch, {username, password}, router)
    }

    return (
        <div>
            <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ border:"1px solid grey",
      padding: 10, width:100, 
      outline: "none",background: "transparent", }}
      onClick={handleClick}
      >
        Login
      </button>
    </div>
        </div>
    )
}

export default Login
