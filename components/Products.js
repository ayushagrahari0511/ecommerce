import { useState, useEffect } from 'react'
import Product from './Product'
import styles from '../styles/Products.module.css'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';

const Products = ({ cat, filters, sort }) => {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    console.log(Math.ceil(filteredProducts.length/15))
    useEffect(() => {
        const data = async () => {
            try {
                const res = await axios.get(cat ? `http://localhost:3000/api/product/find?category=${cat}` : `http://localhost:3000/api/product/find?_page=${page}`)
                setProducts(res.data)
                setFilteredProducts(res.data)
            }
            catch (err) {
                console.log(err)
            }
        };
        data()
    }, [cat, page]);

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter((item) => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)))
        )
    }, [products, cat, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => (Date.parse(b.createdAt)) - (Date.parse(a.createdAt))))
        }
        else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price))
        }
        else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort])
    return (
        <>
            <div>
                <div className={styles.container}>
                    {filteredProducts.map((item) => (
                        <Product item={item} key={item._id} />
                    ))}
                </div>
                <Pagination 
                variant="outlined" 
                count={Math.ceil(filteredProducts.length/15)} 
                hidePrevButton 
                onChange={(event, value) => setPage(value)}
                hideNextButton />
            </div>
        </>
    )
}

export default Products
