import {useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import styles from '../styles/Register.module.css'
import {useSelector} from 'react-redux'

const Register = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useSelector((state) => state.persistedReducer)

    //* Checking If user already exists?
    useEffect(() => {
        if(user.currentUser) {
            router.push('/')
        }
    }, [])

    // *sending data to backend
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', {username, email, password})
            router.push('logIn')
        }
        catch(err) {
            console.log(err)
            return
        }
    }
    return (
        <>
          <div className={styles.container}>
              <div className={styles.wrapper}>
                    <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
                    <form className={styles.form}>
                        <input className={styles.input} type="text" placeholder="name"/>
                        <input className={styles.input} type="text" placeholder="last name"/>
                        <input className={styles.input} type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <input className={styles.input} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input className={styles.input} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input className={styles.input}  type="password" placeholder="confirm password"/>
                        <span className={styles.agreement}>By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b></span>
            <button className={styles.button} onClick={handleClick}>CREATE</button>
                    </form>
              </div>
              </div>  
        </>
    )
}

export default Register
