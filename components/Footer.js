import Twitter from '@mui/icons-material/Twitter'
import Room from '@mui/icons-material/Room'
import Pinterest from '@mui/icons-material/Pinterest'
import Phone from '@mui/icons-material/Phone'
import MailOutline from '@mui/icons-material/MailOutline'
import Instagram from '@mui/icons-material/Instagram'
import Facebook from '@mui/icons-material/Facebook'



import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1 className={styles.logo}>E_Commerce</h1>
                    <p className={styles.desc}>
                    There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
                    </p>
                    <div className={styles.socialContainer}>
                        <div className={styles.socialIcon}>
                            <Facebook className={styles.iconFont}/>
                        </div>
                        <div className={styles.socialIcon}>
                            <Instagram className={styles.iconFont}/>
                        </div>
                        <div className={styles.socialIcon}>
                            <Twitter className={styles.iconFont}/>
                        </div>
                        <div className={styles.socialIcon}>
                            <Pinterest className={styles.iconFont}/>
                        </div>
                    </div>
                </div>
                <div className={styles.center}>
                    <h3 className={styles.title}>
                        Useful Links
                    </h3>
                    <ul className={styles.list}> 
                    <li className={styles.listItem}>Home</li>
                    <li className={styles.listItem}>Cart</li>
                    <li className={styles.listItem}>Man Fashion</li>
                    <li className={styles.listItem}>Woman fashion</li>
                    <li className={styles.listItem}>Accessories</li>
                    <li className={styles.listItem}>My Account</li>
                    <li className={styles.listItem}>Order Tracking</li>
                    <li className={styles.listItem}>Wishlist</li>
                    <li className={styles.listItem}>Terms</li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <h3 className={styles.title}>Contact</h3>
                    <div className={styles.contactItem}>
                        <Room/> 622 Dixie Path , South Tobinchester 98336
                    </div>
                    <div className={styles.contactItem}>
                    <Phone style={{marginRight:"10px"}}/> +1 234 56 78
                    </div>
                    <div className={styles.contactItem}>
                    <MailOutline style={{marginRight:"10px"}} /> contact@E_Commerce.com
                    </div>
                    <Image src="https://i.ibb.co/Qfvn4z6/payment.png" width={200} height={30} alt="img" />
                </div>

            </div>
        </>
    )
}

export default Footer
