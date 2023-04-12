import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  Typography
} from '@mui/material'
import clsx from 'clsx'
import { PrimaryButton, TextButton } from '../Button'
import styles from './style.module.scss'

interface CustomDialogProps {
  titlePopup?: JSX.Element | string
  btnText?: string
  onClick?: () => void
}

const CloseableDialogTitle = (props: DialogTitleProps) => {
  return (
    <DialogTitle {...props}>
      <Typography variant='h6' className={styles.DialogTitleContent}>
        {props.children}
      </Typography>
      <IconButton aria-label='close' className={styles.DialogTitleIconClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  )
}

export const Popup = (props: DialogProps & CustomDialogProps) => {
  const { className, children, titlePopup, PaperProps, onClick, btnText = 'Confirm', ...rest } = props

  return (
    <Dialog
      {...rest}
      className={clsx(styles.DialogRoot, className)}
      PaperProps={{ classes: { root: styles.PaperRoot }, ...PaperProps }}>
      <CloseableDialogTitle className={clsx(styles.DiaLogTitleRoot, className)}>{titlePopup}</CloseableDialogTitle>
      <DialogContent className={clsx(styles.DialogContentRoot, styles.DialogContentTextRoot, className)}>
        {children}
      </DialogContent>
      <DialogActions className={clsx(styles.DialogActionsRoot, className)}>
        <TextButton>Cancel</TextButton>
        <PrimaryButton onClick={onClick}>{btnText}</PrimaryButton>
      </DialogActions>
    </Dialog>
  )
}
