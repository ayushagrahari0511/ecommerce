import Add from '@mui/icons-material/Add'
import {useState} from 'react'
import Remove from '@mui/icons-material/Remove'
import axios from 'axios'
import styles from '../../styles/ProductOne.module.css'
import Image from 'next/image'
import {useDispatch} from 'react-redux'
import { addProduct } from '../../store/cartSlice'

const Product = ({product}) => {
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();

    const handleQuantity = (type) => {
        if(type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        }
        else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        // update cart
        // axios.post()
        dispatch(
            addProduct({
                ...product,
                quantity,
                color,
                size,
            })
        )
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.imgContainer}>
                        <Image width={300} height={300} src={product.img} alt="" className={styles.image}/>
                    </div>
                    <div className={styles.infoContainer}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.desc}>{product.desc}</p>
            <span className={styles.price}>$ {product.price}</span>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <span className={styles.filterTitle}>Color</span>
                    <div className={styles.filterColor} onClick={() => setColor('black')} style={{backgroundColor:'black'}}/>
                    <div className={styles.filterColor} onClick={() => setColor('darkblue')} style={{backgroundColor:'darkblue'}}/>
                    <div className={styles.filterColor} onClick={() => setColor('gray')} style={{backgroundColor:'gray'}}/>
                </div>
                <div className={styles.filter}>
                    <span className={styles.filterTitle}>Size</span>
                    <select className={styles.filterSize}>
                        {
                            product.size.map((size) => (
                                <option className={styles.filterSizeOption} key={product._id} onChange={(e) => setSize(e.target.value)} >{size}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className={styles.addContainer}>
                <div className={styles.amountContainer}>
                    <Remove className={styles.iconShow} onClick={()=> handleQuantity('dec')}/>
                    <span className={styles.amount}>{quantity}</span>
                    <Add className={styles.iconShow} onClick={()=> handleQuantity('inc')}/>
                </div>
                <button className={styles.button} onClick={handleClick}>ADD TO CART</button>
            </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export async function getStaticPaths() {
    const res = await axios.get("http://localhost:3000/api/product/find")
    const productData = res.data
    const para = productData.map((product) => ({params: {id: product._id}})) 
    return {
        paths: 
            [...para]
        ,
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const {id} = context.params
    const res = await axios.get(`http://localhost:3000/api/product/find/${id}`)
    const product = res.data
    return {
      props: {product}, // will be passed to the page component as props
      revalidate: 1,
    }
  }
  

export default Product