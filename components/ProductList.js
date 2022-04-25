import styles from '../styles/ProductList.module.css'
import {useRouter} from 'next/router'
import {useState} from 'react'
import Products from '../components/Products'

const ProductList = () => {
    const router = useRouter()
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")

    const cat   = router.query.cat

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters(
            {...filters,
            [e.target.name]: value,
        })
    }    
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>{cat}</h1>
                <div className={styles.filterContainer}>
                    <div className={styles.filter}>
                        <span className={styles.filterText}>Filter Products:</span>
                        <select name="color" className={styles.select} onChange={handleFilters}>
                            <option disabled >
                                Color
                            </option>
                            <option>White</option>
                            <option>Black</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Yellow</option>
                            <option>Green</option>
                        </select>
                        <select name="size" className={styles.select} onChange={handleFilters}>
                            <option disabled>
                                Size
                            </option>
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                    </div>
                    <div className={styles.filter}>
                        <select className={styles.select} onChange={(e) => setSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="asc">Price (asc)</option>
                            <option value="desc">Price (desc)</option>
                        </select>
                    </div>
                </div>
                <Products cat={cat} filters={filters} sort={sort} />
            </div>
        </>
    )
}

export default ProductList