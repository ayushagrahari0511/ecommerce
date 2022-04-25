import styles from '../styles/Newsletter.module.css'
import Send from '@mui/icons-material/Send'


const Newsletter = () => {
    return (
        <>
           <div className={styles.container}>
               <h1 className={styles.title}>
                   Newsletter
               </h1>
               <div className={styles.desc}>
                    Get timely updates from your favorite products.
               </div>
               <div className={styles.inputContainer}>
                    <input type="email" placeholder="Your email" className={styles.input} />
                    <button className={styles.button}>
                        <Send/>
                    </button>
               </div>
               </div> 
        </>
    )
}

export default Newsletter
