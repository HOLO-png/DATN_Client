import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AcUnitIcon from '@mui/icons-material/AcUnit'

import { Avatar, Box, CardContent, CardHeader, CardMedia, Grid, Slider, Typography, useTheme } from '@mui/material'
import clsx from 'clsx'
import { Card, IconButton } from 'sdk'
import styles from './style.module.scss'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'

function Theatre() {
  const theme = useTheme()

  return (
    <Grid className={clsx(styles.GridContainer, styles.Theatre)} item xl={3} sm={12} md={12} lg={3}>
      <Card classes={{ root: styles.Accessories }}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreHorizIcon />
            </IconButton>
          }
          title='Theatre'
          classes={{ root: styles.root, action: styles.action }}
        />
        <CardMedia
          component='img'
          height='194'
          image='https://vnn-imgs-f.vgcloud.vn/2021/10/11/12/2-phong-cach-thiet-ke.jpg'
          alt='Paella dish'
          className={styles.CardImage}
        />
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' sx={{ width: 46, height: 46 }}>
              <AcUnitIcon />
            </Avatar>
          }
          title='Accessories'
          subheader='September 14, 2016'
          classes={{ root: clsx(styles.root, styles.headerRoot), subheader: styles.subheader, action: styles.action }}
        />
        <Card sx={{ display: 'flex' }} className={styles.CardMusic}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }} className={styles.CardContentMedia}>
              <Typography component='div' variant='span' sx={{ fontSize: '1.1rem' }}>
                Live From Space
              </Typography>
              <Typography variant='subtitle1' color='text.secondary' component='span'>
                Mac Miller
              </Typography>
            </CardContent>
            <div className={styles.Slider}>
              <Slider
                size='small'
                defaultValue={70}
                aria-label='Small'
                valueLabelDisplay='auto'
                className={styles.CardSlider}
              />
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label='previous'>
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label='play/pause'>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label='next'>
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component='img'
            sx={{ width: 151 }}
            src='https://mui.com/static/images/cards/live-from-space.jpg'
            alt='Live from space album cover'
          />
        </Card>

        {/* <CardView title='Accessories' data={accessories} url={'/devices?type=LTE'} /> */}
      </Card>
    </Grid>
  )
}

Theatre.propTypes = {}

export default Theatre
