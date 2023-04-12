import { styled } from '@mui/material/styles'
import styles from './style.module.scss'
import { Box, CardHeader, FormControlLabel, Grid, Switch, Typography } from '@mui/material'
import { Card } from 'sdk'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import ReactFC from 'react-fusioncharts'
import Widgets from 'fusioncharts/fusioncharts.widgets'
import dataSource from './data/dataTemperature.json'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TimePicker } from './TimePicker'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, Widgets)

//add the license key code here

interface isProps {
  isPrimary: boolean
  idx: number
  otherRef: React.LegacyRef<HTMLDivElement>
  shadowCallback: (idx: number) => void
}
const withReactFC = () => {
  return memo(
    forwardRef((props: isProps, ref: React.LegacyRef<HTMLDivElement>) => {
      useEffect(() => {
        // if (!props.isPrimary && ref.current) {
        // ref.current.style.display = 'none'
        // setTimeout(() => {
        //   ref.current.style.display = 'block'
        //   props.otherRef.current.style.display = 'none'
        // }, 500)
        // }
        console.log('@@@@@@@@@@@@HAS MOUNTED', props.idx)
        props.shadowCallback(props.idx)
      }, [])
      return (
        <>
          <div id='container-chart' ref={ref as React.LegacyRef<HTMLDivElement>}>
            <ReactFC {...props} />
          </div>
        </>
      )
    })
  )
}
const WrappedReactFC = withReactFC()

export interface accessorType {
  icon: string
  nameDriver: string
  statusDriver: string
  note: string
}

// FusionCharts.options['license']({
//   key: '<YOUR KEY>',
//   creditLabel: false
// })

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const chartConfigs = {
  type: 'angulargauge',
  width: '100%',
  height: '400',
  dataFormat: 'JSON',
  dataSource: dataSource
}

const WrappedAngularGuage = forwardRef((props, ref) => {
  // const [height, _] = useState(props.height)
  // const [width, __] = useState(props.width)
  // const [resizeToWidth, setResizeToWidth] = useState(props.height)
  // const [resizeToHeight, setResizeToHeight] = useState(props.width)
  const [shadowKey, setShadowKey] = useState(Math.random())
  const isMounted = useRef(false)
  const prevShadowKey = useRef(null)
  const worker1Ref = useRef(null)
  const worker2Ref = useRef(null)
  const lastProps = useRef({
    'worker-1': {},
    'worker-2': {}
  })
  const workers = useRef({
    'worker-1': true,
    'worker-2': false
  })

  useImperativeHandle(ref, () => ({
    chartObj: {
      // resizeTo: (width, height) => {
      //   setResizeToHeight(height)
      //   setResizeToWidth(width)
      //   setShadowKey(Math.random())
      // }
    }
  }))

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true
    setShadowKey(Math.random())
  }, [])

  // const shadowCallback = (idx) => {
  //   if (prevShadowKey.current !== shadowKey) prevShadowKey.current = shadowKey
  //   if (idx === 'worker-1') {
  //     workers.current = { 'worker-1': true, 'worker-2': false }
  //   } else {
  //     workers.current = { 'worker-1': false, 'worker-2': true }
  //   }
  // }

  const getProps = (idx: number) => {
    let localProp = {}
    if (prevShadowKey.current !== shadowKey) {
      // if (workers.current[idx]) {
      //   localProp.isPrimary = true
      //   localProp.shadowCallback = () => {}
      //   localProp.key = lastProps.current[idx].key
      //   localProp.height = height
      //   localProp.width = width
      // } else {
      //   localProp.isPrimary = false
      //   localProp.shadowCallback = shadowCallback
      //   localProp.key = shadowKey
      //   localProp.width = resizeToWidth
      //   localProp.height = resizeToHeight
      // }
    }

    if (Object.keys(localProp).length !== 0) {
      // lastProps.current[idx] = { ...props, ...localProp }
    }
    // return lastProps.current[idx]
  }

  return (
    <>
      {/* {isMounted.current && (
        <WrappedReactFC
          idx='worker-1'
          {...getProps('worker-1')}
          ref={worker1Ref}
          otherRef={worker2Ref}
          className={styles.Chart}
        />
      )}
      {isMounted.current && (
        <WrappedReactFC
          idx='worker-2'
          {...getProps('worker-2')}
          ref={worker2Ref}
          otherRef={worker1Ref}
          className={styles.Chart}
        />
      )} */}
    </>
  )
})

function Temperature() {
  const [height, setHeight] = useState(300)
  const [width, setWidth] = useState(300)
  const ref = useRef(null)

  return (
    <Grid className={styles.GridContainer} item xl={6} sm={12} md={12} lg={6}>
      <Card classes={{ root: styles.Accessories }}>
        <CardHeader
          action={<FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />} label='' />}
          title='Current Temperature'
          subheader='September 14, 2016'
          classes={{ root: styles.root, subheader: styles.subheader, action: styles.action }}
        />
        {/* <WrappedAngularGuage {...chartConfigs} height={height} width={width} ref={ref} /> */}
        <Grid item container sx={{ background: '#191919' }}>
          <Grid item xl={6} sm={12} md={12} lg={6}>
            <div className={styles.CardInfo}>
              <Box>
                <Typography variant='body1'>70m2</Typography>
                <Typography variant='overline'>First Flor</Typography>
              </Box>
              <div className={styles.hr}></div>
              <Box>
                <Typography variant='body1'>40m</Typography>
                <Typography variant='overline'>Time</Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xl={6} sm={12} md={12} lg={6}>
            <TimePicker />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

Temperature.propTypes = {}

export default Temperature
