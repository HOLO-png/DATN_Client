import { List, ListItemButton } from '@mui/material'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from 'sdk/store'
import { DataMenu } from './Data'
import logo1 from './image/Ellipse.png'
import styles from './style.module.scss'

export const SideMenu = () => {
  const isRoleAdmin = useAuthStore((store) => store.auth?.role === 'ADMIN')
  return (
    <div className={styles.SideMenu}>
      <div className={styles.logo}>
        <img className={styles.imgEllipse} src={logo1} alt={logo1} />
      </div>
      <List className={styles.list} component='nav'>
        {DataMenu.map((data, index) => {
          if (!isRoleAdmin && data.onlyAdmin) return <Fragment key={index}></Fragment>
          return (
            <div key={index}>
              <NavLink to={data.path} className={styles.navLink} key={index}>
                <ListItemButton className={styles.ListItemButton}>{data.icon}</ListItemButton>
              </NavLink>
            </div>
          )
        })}
      </List>
    </div>
  )
}
