import styles from '../styles/Product.module.css'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'





const Product = ({ item }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.circle}>
                    <Image src={item.img} width={200} height={200} alt=""/>
                </div>
                <div className={styles.info}>
                    <div className={styles.icon}>
                        <ShoppingCartOutlined />
                    </div>
                        <Link href={`/products/${item._id}`} passHref>
                    <div className={styles.icon}>
                        <SearchOutlined />
                    </div>
                        </Link>
                    <div className={styles.icon}>
                        <FavoriteBorderOutlined />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
