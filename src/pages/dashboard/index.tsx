import { Box, Card, Grid, Skeleton, Tab } from '@mui/material'
import { DASHBOARD_ENDPOINT } from 'constants/ApiConstant'
import { useEffect, useState } from 'react'
import { a11yProps, ApiCore, Layout, PaneTabs, TabPanel } from 'sdk'
import CardView from './CardView'
import Accessories from './Accessories'
import styles from './style.module.scss'
import Theatre from './Theatre'
import TodoList from './TodoList'
import Temperature from './Temperature'
import ElectricityConsumer from './ElectrictyConsumed'

interface DashBoardData {
  LTE: { total: number; online: number }
  WIFI: { total: number; online: number }
}

const DashboardSkeleton = () => (
  <>
    <Grid item xs={12}>
      <h2>
        <Skeleton variant='text' width='5%' height='2.5rem' sx={{ backgroundColor: '#3d3d3d' }} />
      </h2>
    </Grid>
    <Grid className={styles.contentSkeleton}>
      <Card className={styles.boxSkeleton}>
        <Skeleton variant='text' width='80%' height='45%' className={styles.skeleton} />
        <Skeleton variant='rectangular' width='80%' height='40%' className={styles.skeleton} />
      </Card>
      <Card className={styles.boxSkeleton}>
        <Skeleton variant='text' width='80%' height='45%' className={styles.skeleton} />
        <Skeleton variant='rectangular' width='80%' height='40%' className={styles.skeleton} />
      </Card>
    </Grid>
    <Grid item xs={12}>
      <h2>
        <Skeleton variant='text' width='5%' height='2.5rem' sx={{ backgroundColor: '#3d3d3d' }} />
      </h2>
    </Grid>
    <Grid className={styles.contentSkeleton}>
      <Card className={styles.boxSkeleton}>
        <Skeleton variant='text' width='80%' height='45%' className={styles.skeleton} />
        <Skeleton variant='rectangular' width='80%' height='40%' className={styles.skeleton} />
      </Card>
      <Card className={styles.boxSkeleton}>
        <Skeleton variant='text' width='80%' height='45%' className={styles.skeleton} />
        <Skeleton variant='rectangular' width='80%' height='40%' className={styles.skeleton} />
      </Card>
    </Grid>
  </>
)

const tabItem = ['Living Room', 'Bed Room', 'Study Room', 'Kitchen']

export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState<DashBoardData>()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchApi = async () => {
      const resp = await ApiCore.get(DASHBOARD_ENDPOINT)
      setDataDashboard(resp.data)
    }
    fetchApi()
  }, [])

  return (
    <Layout>
      <Box className='tab-header'>
        <PaneTabs
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='Dashboard'>
          {tabItem.map((tab, idx) => (
            <Tab label={tab} key={idx} {...a11yProps(idx)} />
          ))}
        </PaneTabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* {dataDashboard ? (
          <Grid className={styles.GridContainer} container spacing={2}>
            <CardView title='LTE' data={dataDashboard.LTE} url={'/devices?type=LTE'} />
            <CardView title='Wi-Fi' data={dataDashboard.WIFI} url={'/devices?type=WIFI'} />
          </Grid>
        ) : (
          <DashboardSkeleton />
        )} */}
        <Grid container spacing={2}>
          <Accessories />
          <Theatre />
          <TodoList />
          <Temperature />
          <ElectricityConsumer />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Layout>
  )
}
