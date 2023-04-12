import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import styles from './style.module.scss'
import { CardHeader, Grid } from '@mui/material'
import CardView from './CardView'
import { Card, IconButton } from 'sdk'

export interface accessorType {
  icon: string
  nameDriver: string
  statusDriver: string
  note: string
}

const accessories: accessorType[] = [
  {
    icon: '',
    nameDriver: 'Dezzlab Wi-Fi',
    statusDriver: 'connected',
    note: ''
  },
  {
    icon: '',
    nameDriver: 'Dezzlab Wi-Fi',
    statusDriver: 'connected',
    note: ''
  },
  {
    icon: '',
    nameDriver: 'Dezzlab Wi-Fi',
    statusDriver: 'connected',
    note: ''
  },
  {
    icon: '',
    nameDriver: 'Dezzlab Wi-Fi',
    statusDriver: 'connected',
    note: ''
  },
  {
    icon: '',
    nameDriver: 'Dezzlab Wi-Fi',
    statusDriver: 'connected',
    note: ''
  }
]

function Accessories() {
  return (
    <Grid className={styles.GridContainer} item xl={6} sm={12} md={12} lg={6}>
      <Card classes={{ root: styles.Accessories }}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreHorizIcon />
            </IconButton>
          }
          title='Accessories'
          subheader='September 14, 2016'
          classes={{ root: styles.root, subheader: styles.subheader, action: styles.action }}
        />
        <CardView title='Accessories' data={accessories} url={'/devices?type=LTE'} />
      </Card>
    </Grid>
  )
}

Accessories.propTypes = {}

export default Accessories
