import styles from "../../styles/WidgetSm.module.css";
import Visibility from "@mui/icons-material/Visibility";
import {useState, useEffect} from 'react'
import {userRequest} from '../../requestMethods'

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("find?new=true")
      setUsers(res.data)
    };
    getUsers()
  }, [])
  return (
    <div className={styles.widgetSm}>
      <span className={styles.widgetSmTitle}>New Join Members</span>
      <ul className={styles.widgetSmList}>
        {users.map((user) => (
          <li className={styles.widgetSmListItem} key={user._id}>
          <img
            src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            alt=""
            className={styles.widgetSmImg}
            />
          <div className={styles.widgetSmUser}>
            <span className={styles.widgetSmUsername}>{user.username}</span>
          </div>
          <button className={styles.widgetSmButton}>
            <Visibility className={styles.widgetSmIcon} />
            Display
          </button>
        </li>
            ))}
        </ul>
    </div>
  );
}
