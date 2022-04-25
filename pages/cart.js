import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import Add from '@mui/icons-material/Add'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Remove from '@mui/icons-material/Remove'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import { useRouter } from 'next/router'

const stripePromise = loadStripe("pk_test_51Kevl1SFKShQSTPWZWpYyJ8ntRmv0Rm7hJQ581SatDI9dX8Pqgs6lukTyZ3VCCr68a5Z7fXYnc6yEfht3KeHtMz700VlRMtlDy")

const Cart = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const { cart } = useSelector(state => state.pesistedCartReducer)
    const { currentUser } = useSelector(state => state.persistedReducer.user)
    const [clientSecret, setClientSecret] = useState("")

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const makeRequest = async () => {
        try {
            if (!currentUser) {
                router.push({
                    pathname: '/logIn',
                    query: {
                        returnUrl: router.asPath
                    }
                });
                return
            }
            else {
                const res = await axios.post('api/payment', {
                    amount: cart.total * 100
                })
                setClientSecret(res.data.clientSecret)
                handleToggle()
            }
        }
        catch (err) {
            console.log(err)
        }
    };
    const appearance = {
        theme: 'night',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <div>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>
                        YOUR BAG
                    </h1>
                    <div className={styles.top}>
                        <div className={styles.topTexts}>
                            <button className={styles.topButton}>CONTINUE SHOPPING</button>
                            <span className={styles.topText}>
                                Shopping Bag(2)
                            </span>
                            <span className={styles.topText}>
                                Your Wishlist (0)
                            </span>
                            <button className={styles.topButton}>CHECKOUT NOW</button>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.info}>
                                {cart.products?.map((item) => (

                                    <div className={styles.product} key={item._id}>
                                        <div className={styles.productDetail}>
                                            <Image alt="" src={item.img} width={200} height={200} className={styles.image} />
                                            <div className={styles.details}>
                                                <span className={styles.productName}>
                                                    <b>Product:</b> {item.title}
                                                </span>
                                                <span className={styles.productColor}>
                                                    <b>ID:</b> {item._id}
                                                </span>
                                                <div className={styles.productColor} style={{
                                                    backgroundColor: item.color
                                                }} />
                                                <div className={styles.productSize}>
                                                    <b>Size:</b> {item.size}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.priceDetail}>
                                            <div className={styles.productAmountContainer}>
                                                <Add />
                                                <div className={styles.productAmount}>
                                                    {item.quantity}
                                                </div>
                                                <Remove />
                                            </div>
                                            <div className={styles.productPrice}>$ {item.price * item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                            </div>
                            <div className={styles.summary}>
                                <h1 className={styles.summaryTitle}>ORDER SUMMARY</h1>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryItemText}>Subtotal</span>
                                    <span className={styles.summaryItemPrice}>$ {cart.total}</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryItemText}>Estimated Shipping</span>
                                    <span className={styles.summaryItemPrice}>$ 5.90</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryItemText}>Shipping Discount</span>
                                    <span className={styles.summaryItemPrice}>$ -5.90</span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryItemText}>Total</span>
                                    <span className={styles.summaryItemPrice}>$ {cart.total}</span>
                                </div>
                                <button className={styles.topButton} onClick={makeRequest}>CHECKOUT NOW</button>
                                {
                                    clientSecret && (
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={open}
                                            onClick={handleClose}
                                        >
                                            <Elements options={options} stripe={stripePromise}>
                                                <CheckoutForm />
                                            </Elements>
                                        </Backdrop>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
