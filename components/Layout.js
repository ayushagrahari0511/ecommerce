import Navbar from './Navbar'
import Footer from './Footer'
import Topbar from './topbar/Topbar'
import Sidebar from './sidebar/Sidebar'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'

const Layout = ({children}) => {
    const {currentUser} = useSelector(state => state.persistedReducer.user)
    const router = useRouter()
    return (
        <>
            {currentUser?.isAdmin ? <>
             <Topbar/>
             <Sidebar/> 
             </> : 
             <Navbar/> }
            <main>
                {children}
            </main>
            {
                currentUser?.isAdmin ? "" : <Footer/> 
            }
        </>
    )
}

export default Layout
