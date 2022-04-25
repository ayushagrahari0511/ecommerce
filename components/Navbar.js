import Badge from '@mui/material/Badge'
import styles from '../styles/Navbar.module.css'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Search from '@mui/icons-material/Search'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import {useSelector, useDispatch} from 'react-redux'
import {loginSuccess} from '../store/userSlice'


const Navbar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {persistedReducer, pesistedCartReducer} = useSelector(state => state)
    const {user} = persistedReducer;
    const {cart} = pesistedCartReducer;
    const handleLogout = () => {
        if(typeof window !== 'undefined') {
            localStorage.clear()
            location.replace('/')
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <span className={styles.language}>
                            EN
                        </span>
                        <div className={styles.searchcontainer}>
                            <input type="text" placeholder="Search" className={styles.input}/>
                            <Search className={styles.searchIcon}/>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <Link href="/" passHref>
                       <h1 className={styles.logo}>E_commerce</h1>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        {user.currentUser ? <Link href="/" passHref>
                        <div className={styles.menuItem} onClick={handleLogout} >LOGOUT</div>
                        </Link> 
                        :
                        <>
                        <Link href="/register" passHref>
                        <div className={styles.menuItem}>REGISTER</div>
                        </Link>
                        <Link href="/logIn" passHref>
                        <div className={styles.menuItem}>SIGN IN</div>
                        </Link>
                        </>
                        }
                        <Link href="/admin" passHref>
                        <div className={styles.menuItem}>ADMIN</div>
                        </Link>
                        <div className={styles.menuItem}>
                                <Link href="/cart" passHref>
                            <Badge badgeContent={cart.quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
