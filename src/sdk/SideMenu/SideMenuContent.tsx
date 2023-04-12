import { List, ListItemButton } from '@mui/material'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from 'sdk/store'
import { DataMenu } from './Data'
import styles from './style.module.scss'
export const SideMenuContent = () => {
  const isRoleAdmin = useAuthStore((store) => store.auth?.role === 'ADMIN')
  return (
    <div className={styles.SideMenuContent}>
      <List className={styles.list} component='nav'>
        {DataMenu.map((data, index) => {
          if (!isRoleAdmin && data.onlyAdmin) return <Fragment key={index}></Fragment>
          return (
            <div key={index}>
              <NavLink to={data.path} className={styles.navLink}>
                <ListItemButton className={styles.ListItemButton}>{data.title}</ListItemButton>
              </NavLink>
            </div>
          )
        })}
      </List>
    </div>
  )
}
