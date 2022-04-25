import { useState, useEffect } from "react";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { DataGrid } from '@mui/x-data-grid';
import styles from '../../styles/AdminProList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from "../../store/apiCalls";
import {deleteProduct} from '../../store/apiCalls'

const ProductList = () => {
  const dispatch = useDispatch()

  const {product} = useSelector(state => state.productStore)

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteProduct(dispatch, id)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "products",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.productListItem}>
            <Image className={styles.productListImg} src={params.row.img} alt="" height={40} width={40}/>
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/admin/product/" + params.row._id} passHref>
              <button className={styles.productListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="admin_home">
    <div className="admin_wrapper">
    <div className={styles.productList}>
        <DataGrid
          rows={product.products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10]}
        />
      </div>
      </div>
      </div>
  );
}

export default ProductList