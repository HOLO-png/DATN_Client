import styles from './style.module.scss'
import { CardHeader, FormControl, Grid, MenuItem, Select, Switch } from '@mui/material'
import { Card } from 'sdk'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import ReactFC from 'react-fusioncharts'
import Widgets from 'fusioncharts/fusioncharts.widgets'
import dataSource from './data/dataElectricity.json'
import { ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styled from '@emotion/styled'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, Widgets)

//add the license key code here

interface isProps {
  isPrimary: boolean
  idx: number
  otherRef: { current: any }
  shadowCallback: (idx: number) => void
}

const withReactFC = () => {
  return memo(
    forwardRef((props: isProps, ref: ForwardedRef<any>) => {
      useEffect(() => {
        if (!props.isPrimary && ref) {
          // ref.current.style.display = 'none'
          // setTimeout(() => {
          //   ref.current.style.display = 'block'
          //   props.otherRef.current.style.display = 'none'
          // }, 500)
        }
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
        opacity: 1
        // backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    // backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
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
    // backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const WrappedAngularGuage = forwardRef((props: any, ref) => {
  const [height, _] = useState(props?.height)
  const [width, __] = useState(props?.width)
  const [resizeToWidth, setResizeToWidth] = useState(props.height)
  const [resizeToHeight, setResizeToHeight] = useState(props.width)
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
      resizeTo: (width: any, height: any) => {
        setResizeToHeight(height)
        setResizeToWidth(width)
        setShadowKey(Math.random())
      }
    }
  }))

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true
    setShadowKey(Math.random())
  }, [])

  const shadowCallback = (idx: any) => {
    // if (prevShadowKey.current !== shadowKey) prevShadowKey.current = shadowKey
    if (idx === 'worker-1') {
      workers.current = { 'worker-1': true, 'worker-2': false }
    } else {
      workers.current = { 'worker-1': false, 'worker-2': true }
    }
  }

  const getProps = (idx: any) => {
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

function ElectricityConsumer() {
  const [height, setHeight] = useState(662)
  const [width, setWidth] = useState(450)
  const [val, setVal] = useState(7)
  const handleChange = (event: any) => {
    setVal(event.target.value)
  }
  const ref = useRef(null)

  function getColumnData(data: any, name: any) {
    const index = data.data[0].indexOf(name) // 0
    return data.data.slice(1).map((row: any) => row[index])
  }

  function dataToChartData(data: any) {
    return {
      chart: {
        caption: data.title,
        yaxisname: data.y,
        xaxisname: data.x,
        showhovereffect: '1',
        numbersuffix: '%',
        drawcrossline: '1',
        origw: '380',
        origh: '150',
        theme: 'candy',
        placeValuesInside: '0',
        showValues: '0',
        valuefontsize: '11',
        bgColor: '#191919',
        bgAlpha: '100',
        baseFontSize: '11',
        showBorder: '0',
        showLegend: '0',
        canvasbgColor: '#191919',
        canvasBorderThickness: '0',
        showAlternateHGridColor: '0',
        captionOnTop: '0',
        captionOnBottom: '0',
        baseFontColor: '#fff',
        toolTipBorderColor: '#666666',
        toolTipBgColor: '#191919',
        toolTipBgAlpha: '80',
        showToolTipShadow: '1',
        divLineDashed: '1',
        divLineDashLen: '5',
        divLineDashGap: '6'
      },
      categories: [
        {
          category: getColumnData(data, 'Year').map((label: string) => ({ label: label.toString() }))
        }
      ],
      dataset: data.data[0].slice(1).map((seriesname: any, index: number) => ({
        seriesname,
        data: getColumnData(data, seriesname).map((value: any) => ({ value }))
      }))
    }
  }

  const data = dataToChartData(dataSource)
  const chartConfigs = {
    type: 'msline',
    renderAt: 'chart-container',
    width: '500',
    height: '100%',
    dataFormat: 'json',
    dataSource: data
  }

  return (
    <Grid className={styles.GridContainer} item xl={6} sm={12} md={12} lg={6}>
      <Card classes={{ root: styles.Accessories }}>
        <CardHeader
          action={
            <FormControl>
              <Select
                value={val}
                onChange={handleChange}
                // IconComponent={ExpandMoreRoundedIcon}
              >
                {[
                  { key: 'Last 7 Days', value: 7 },
                  { key: 'Last 28 Days', value: 28 },
                  { key: 'Last 90 Days', value: 90 }
                ].map((item) => (
                  <MenuItem key={item.key} value={item.value}>
                    {item.key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          title='Electricity Consumed'
          subheader='September 14, 2016'
          classes={{ root: styles.root, subheader: styles.subheader, action: styles.action }}
        />
        <WrappedAngularGuage {...chartConfigs} height={height} width={width} ref={ref} />
      </Card>
    </Grid>
  )
}

ElectricityConsumer.propTypes = {}

export default ElectricityConsumer
