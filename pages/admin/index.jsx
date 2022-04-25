import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { userRequest } from '../../requestMethods'
import WidgetLg from "../../components/widgetLg/WidgetLg";
import styles from "../../styles/Admin.module.css";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'


const Home = () => {
  const [userStats, setUserStats] = useState([])
  const { currentUser } = useSelector(state => state.persistedReducer.user)
  const router = useRouter()

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

      if (!currentUser) {
        router.push({
          pathname: '/logIn',
          query: {
            returnUrl: router.asPath
          }
        });
      }
      try {
        const res = await userRequest.get("stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) { console.log(err) }
    };
    getStats();
  }, [MONTHS]);
  return (
    <>
      {
        currentUser?.isAdmin ?
          <div className="admin_home">
            <div className="admin_wrapper">

              <FeaturedInfo />
              <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
              <div className={styles.homeWidgets}>
                <WidgetSm />
                <WidgetLg />
              </div>
            </div>
          </div> :
          <h2>You have to Take admin permission to access admin panel</h2>
      }
    </>
  );
}

export default Home