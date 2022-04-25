import Link from 'next/link'
import {useState, useMemo, useEffect} from 'react'
import Chart from "../../../components/chart/Chart"
import Publish from "@mui/icons-material/Publish";
import styles from '../../../styles/AdminProduct.module.css'
import {useSelector} from 'react-redux'
import {userRequest} from '../../../requestMethods'

export async function getServerSideProps(context) {
    const {id} = context.params
    return {
      props: {id}, // will be passed to the page component as props
    }
  }

export default function Product({id}) {
    const [pStats, setPStats] = useState([])
    const product = useSelector((state) => state.productStore.product.products.find((product) => product._id === id))

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ], []
        );

        useEffect(() => {
            const getStats = async () => {
              try {
                const res = await userRequest.get('income?pid=' + id)
                const list = res.data.sort((a,b) => {
                    return a._id - b._id
                })
                list.map((item) => 
                setPStats((prev) => [
                    ...prev,
                    {name: MONTHS[item._id - 1], Sales: item.total},
                ])
                )
              }
              catch (err) {
                console.log(err)
              }
            };
            getStats()
          }, [id, MONTHS])      
    
    return (
        <div className="admin_home">
            <div className="admin_wrapper">
                <div className={styles.product}>
                    <div className={styles.productTitleContainer}>
                        <h1 className={styles.productTitle}>Product</h1>
                        <Link href="/admin/NewProduct" passHref>
                            <button className={styles.productAddButton}>Create</button>
                        </Link>
                    </div>
                    <div className={styles.productTop}>
                        <div className={styles.productTopLeft}>
                            <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                        </div>
                        <div className={styles.productTopRight}>
                            <div className={styles.productInfoTop}>
                                <img src={product.img} alt="" className={styles.productInfoImg} />
                                <span className={styles.productName}>{product.title}</span>
                            </div>
                            <div className={styles.productInfoBottom}>
                                <div className={styles.productInfoItem}>
                                    <span className={styles.productInfoKey}>id:</span>
                                    <span className={styles.productInfoValue}>{product._id}</span>
                                </div>
                                <div className={styles.productInfoItem}>
                                    <span className={styles.productInfoKey}>sales:</span>
                                    <span className={styles.productInfoValue}>5123</span>
                                </div>
                                <div className={styles.productInfoItem}>
                                    <span className={styles.productInfoKey}>in stock:</span>
                                    <span className={styles.productInfoValue}>{product.inStock}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productBottom}>
                        <form className={styles.productForm}>
                            <div className={styles.productFormLeft}>
                                <label>Product Name</label>
                                <input type="text" placeholder={product.title} />
                                <label>In Stock</label>
                                <select name="inStock" id="idStock">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                <label>Product Description</label>
                                <input type="text" placeholder={product.desc} />
                                <label>Price</label>
                                <input type="text" placeholder={product.price} />
                            </div>
                            <div className={styles.productFormRight}>
                                <div className={styles.productUpload}>
                                    <img src={product.img} alt="" className={styles.productUploadImg} />
                                    <label htmlFor="file">
                                        <Publish />
                                    </label>
                                    <input type="file" id="file" style={{ display: "none" }} />
                                </div>
                                <button className={styles.productButton}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
