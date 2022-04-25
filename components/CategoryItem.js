import styles from '../styles/CategoryItem.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CategoryItem = ({item}) => {
    return (
        <>
            <div className={styles.container}>
                <Image alt="" src={item.img} layout="fill"/>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {item.title}
                    </h1>
                <Link href={{
                    pathname: 'products',
                    query: {cat: item.cat}
                }} passHref>
                    <button className={styles.button}>
                        SHOP NOW
                    </button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default CategoryItem
