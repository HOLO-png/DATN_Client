import { Avatar, Card, CardContent, CardHeader, Grid, Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import AddIcon from '@mui/icons-material/Add'
import { IconButton } from 'sdk'
import { accessorType } from '../Accessories'
import styles from '../style.module.scss'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface Props {
  title?: string
  url: string
  data: accessorType[]
}

export default function CardView(props: Props) {
  const { title, url, data } = props
  return (
    <div className={styles.content}>
      <Grid container item columnSpacing={2} rowSpacing={2}>
        {data.map((item, index) => (
          <Grid item sm={6} md={6} lg={4} xl={4} key={index}>
            <Card className={styles.Card}>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' sx={{ width: 46, height: 46 }}>
                    <AcUnitIcon />
                  </Avatar>
                }
                action={
                  <Tooltip title='note' arrow disableFocusListener placement='top'>
                    <IconButton aria-label='settings'>
                      <ErrorOutlineIcon />
                    </IconButton>
                  </Tooltip>
                }
                classes={{ root: styles.CartItemRoot, subheader: styles.subheader, action: styles.action }}
              />
              <CardContent className={styles.CardContent} classes={{ root: styles.contentRoot }}>
                <Typography variant='body2' className={clsx(styles.number, styles.Typography)}>
                  {item.nameDriver}
                </Typography>
                <Typography variant='body1' component='div' className={clsx(styles.text, styles.Typography)}>
                  {item.statusDriver}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item sm={6} md={6} lg={4} xl={4}>
          <Card className={clsx(styles.Card, styles.CardAdd)}>
            <AddIcon className={styles.IconAdd} />
            <CardContent className={styles.CardContent} classes={{ root: styles.contentRoot }}>
              <Typography variant='body2' className={clsx(styles.number, styles.Typography)}>
                Add More
              </Typography>
              <Typography variant='body1' component='div' className={clsx(styles.text, styles.Typography)}>
                Accessories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
