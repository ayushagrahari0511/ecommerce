import styles from "../../styles/FeaturedInfo.module.css";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import { useState, useEffect } from 'react'
import { userRequest } from '../../requestMethods'

export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('income')
        setIncome(res.data)
        setPerc((res.data[1].total * 100) / res.data[0].total - 100)
      }
      catch (err) {
        console.log(err)
      }
    };
    getIncome()
  }, [])
  return (
    <div className={styles.featured}>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Revanue</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>${income[1]?.total}</span>
          <span className={styles.featuredMoneyRate}>
            {Math.floor(perc)}% {
              perc < 0 ? (
                <ArrowDownward className={styles.featuredIcon.negative} />
              )
                :
                (
                  <ArrowUpward className={styles.featuredIcon} />
                )
            }
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Sales</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$4,415</span>
          <span className={styles.featuredMoneyRate}>
            -1.4 <ArrowDownward className={styles.featuredIcon.negative} />
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Cost</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$2,225</span>
          <span className={styles.featuredMoneyRate}>
            +2.4 <ArrowUpward className={styles.featuredIcon} />
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
    </div>
  );
}
