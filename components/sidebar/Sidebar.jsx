import styles from "../../styles/Sidebar.module.css";
import LineStyle from "@mui/icons-material/LineStyle";
import Timeline from '@mui/icons-material/Timeline'
import TrendingUp from '@mui/icons-material/TrendingUp'
import PermIdentity from '@mui/icons-material/PermIdentity'
import Storefront from '@mui/icons-material/Storefront'
import AttachMoney from '@mui/icons-material/AttachMoney'
import BarChart from '@mui/icons-material/BarChart'
import MailOutline from '@mui/icons-material/MailOutline'
import DynamicFeed from '@mui/icons-material/DynamicFeed'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'
import WorkOutline from '@mui/icons-material/WorkOutline' 
import Report from '@mui/icons-material/Report'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Dashboard</h3>
          <ul className={styles.sidebarList}>
            <Link href="/admin" className={styles.link}>
            <li className={styles.sidebarListItem }>
              <LineStyle className={styles.sidebarIcon} />
              Home
            </li>
            </Link>
            <li className={styles.sidebarListItem}>
              <Timeline className={styles.sidebarIcon} />
              Analytics
            </li>
            <li className={styles.sidebarListItem}>
              <TrendingUp className={styles.sidebarIcon} />
              Sales
            </li>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Quick Menu</h3>
          <ul className={styles.sidebarList}>
            <Link href="/users" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PermIdentity className={styles.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link href="/admin/ProductList" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <Storefront className={styles.sidebarIcon} />
                Products
              </li>
            </Link>
            <li className={styles.sidebarListItem}>
              <AttachMoney className={styles.sidebarIcon} />
              Transactions
            </li>
            <li className={styles.sidebarListItem}>
              <BarChart className={styles.sidebarIcon} />
              Reports
            </li>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Notifications</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <MailOutline className={styles.sidebarIcon} />
              Mail
            </li>
            <li className={styles.sidebarListItem}>
              <DynamicFeed className={styles.sidebarIcon} />
              Feedback
            </li>
            <li className={styles.sidebarListItem}>
              <ChatBubbleOutline className={styles.sidebarIcon}/>
              Messages
            </li>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Staff</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <WorkOutline className={styles.sidebarIcon} />
              Manage
            </li>
            <li className={styles.sidebarListItem}>
              <Timeline className={styles.sidebarIcon} />
              Analytics
            </li>
            <li className={styles.sidebarListItem}>
              <Report className={styles.sidebarIcon} />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
