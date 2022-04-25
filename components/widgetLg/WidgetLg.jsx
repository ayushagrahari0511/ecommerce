import styles from "../../styles/WidgetLg.module.css";
import { useState, useEffect } from 'react'
import { userRequest } from "../../requestMethods";
import { format } from 'timeago.js'

export default function WidgetLg() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get('order')
        setOrders(res.data);
      }
      catch (err) {
        console.log(err)
      }
    };
    getOrder()
  }, [])
  const Button = ({ type }) => {
    return <button className={`${styles.widgetLgButton} + ${type}`}>{type}</button>;
  };
  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.widgetLgTitle}>Latest transactions</h3>
      <table className={styles.widgetLgTable}>
        <thead>
          <tr className={styles.widgetLgTr}>
            <th className={styles.widgetLgTh}>Customer</th>
            <th className={styles.widgetLgTh}>Date</th>
            <th className={styles.widgetLgTh}>Amount</th>
            <th className={styles.widgetLgTh}>Status</th>
          </tr>
        </thead>
        {orders.map((order) => (
          <tbody key={order._Id}>
            <tr className={styles.widgetLgTr} key={order._id}>
              <td className={styles.widgetLgUser}>
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className={styles.widgetLgImg}
                />
                <span className={styles.widgetLgName}>{order.userId}</span>
              </td>
              <td className={styles.widgetLgDate}>{format(order.createdAt)}</td>
              <td className={styles.widgetLgAmount}>{order.amount}</td>
              <td className={styles.widgetLgStatus}>
                <Button type={order.status} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
