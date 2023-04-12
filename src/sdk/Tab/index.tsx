import { Box, Tabs, TabsProps, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export const BasicTabs = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
      className={clsx(styles.BasicTabs, props.className)}
      classes={{
        flexContainer: styles.BasicContainer,
        indicator: styles.BasicIndicator
      }}>
      {props.children}
    </Tabs>
  )
}

export const PaneTabs = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
      className={clsx(styles.PaneTabs, props.className)}
      classes={{
        flexContainer: styles.PaneContainer,
        indicator: styles.PaneIndicator
      }}
      TabIndicatorProps={{
        children: <span />
      }}>
      {props.children}
    </Tabs>
  )
}
