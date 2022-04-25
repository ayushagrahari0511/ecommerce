import {useEffect, useState} from 'react'
import styles from '../styles/LogIn.module.css'
import Link from 'next/link'
import axios from 'axios'
import {login} from '../store/apiCalls'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const dispatch = useDispatch()

    const {isFetching, error} = useSelector((state) => state.persistedReducer.user)
    
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, {username, password}, router)
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>
                        <form className={styles.form}>
                            <input value={username} type="text" className={styles.input} placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                            <input  value={password} type="password" className={styles.input} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                            <button className={styles.button} disabled={isFetching} onClick={handleClick}>LOGIN</button>
                            {error && <span style={{color: "red"}} >Something went wrong...</span>}
                            <Link href="" className={styles.link}>DO NOT YOU REMEMBER THE PASSWORD</Link>
                            <Link href="/register" className={styles.link}>CREATE A NEW ACCOUNT</Link>
                        </form>
                    </h1>
                </div>
            </div>
        </>
    )
}

export default LogIn
