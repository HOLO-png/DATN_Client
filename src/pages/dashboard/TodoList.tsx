import CommentIcon from '@mui/icons-material/Comment'

import {
  Avatar,
  CardHeader,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material'
import clsx from 'clsx'
import { Card, IconButton } from 'sdk'
import styles from './style.module.scss'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

function TodoList() {
  const [checked, setChecked] = useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <Grid className={clsx(styles.GridContainer, styles.Theatre)} item xl={3} sm={12} md={12} lg={3}>
      <Card classes={{ root: styles.Accessories }}>
        <CardHeader
          action={
            <Avatar
              aria-label='recipe'
              src='https://mui.com/static/images/avatar/1.jpg'
              sx={{ width: 56, height: 56, alignSelf: 'center' }}
              className={styles.CardAvatarStyle}
            />
          }
          title='Sean Sultan'
          subheader='Owner'
          classes={{ root: clsx(styles.CardTodoList, styles.root), action: styles.action, subheader: styles.subheader }}
        />
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <AddIcon />
            </IconButton>
          }
          title='To do list'
          sx={{ padding: '5px 17px' }}
          classes={{ root: styles.root, action: styles.action }}
        />
        <List sx={{}} className={styles.List}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton aria-label='comments'>
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding>
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Card>
    </Grid>
  )
}

TodoList.propTypes = {}

export default TodoList
