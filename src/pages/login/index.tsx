import { VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import clsx from 'clsx'
import GoogleIcon from '@mui/icons-material/Google'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
//   GoogleAuthProvider,
//   signInWithPopup,
//   User as FirebaseUser,
// } from 'firebase/auth'

// import app from 'sdk/firebase'
import { ApiCore, Popup, setCookie, useAuthStore, useNotificationStore } from 'sdk'
import eyeOnIc from './eyeOn.svg'
import LogoIcon from './LogoIcon.svg'
import styles from './styles.module.scss'
import { FORGOT_PASS_ENDPOINT, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from 'constants/ApiConstant'
import { AxiosResponse } from 'axios'
interface DataLogin {
  email?: string
  password?: string
  confirmPassword?: string
  fullname?: string
  username?: string
}
// interface User extends FirebaseUser {
//   accessToken: string
//   stsTokenManager: {
//     expirationTime: number
//     refreshToken: string
//   }
// }

const HelperText = ({ message }: { message?: string }) => <span className={styles.HelpText}>{message}</span>
export default function Login() {
  // const auth = getAuth(app)
  const [toggleIconEye, setToggleIconEye] = useState(true)
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false)
  const [isSignin, setIsSignin] = useState(true)
  const dispatchNotification = useNotificationStore((s) => s.dispatchNotification)
  const setAuth = useAuthStore((s) => s.setAuth)
  const [errorLogin, setErrorLogin] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const loginRef = useRef<DataLogin>({})
  const toggleIconPassword = (toggle: boolean) => {
    setToggleIconEye(!toggle)
  }

  const googleSignIn = async () => {}

  const onSubmit = async () => {
    try {
      if (loginRef.current.email && loginRef.current.password) {
        if (isSignin) {
          ApiCore.post(`${LOGIN_ENDPOINT}`, loginRef.current)
            .then((res) => {
              if (!res.status) {
                // dispatchNotification('error', res?.response.data.msg)
                return setErrorLogin(true)
              }
              setAuth(res.data.user)
              const expires = new Date(Date.now() + 24 * 60 * 60 * 60 * 5).toUTCString()
              const searchLocation = new URLSearchParams(location.search).get('redirectUrl')
              setCookie('access', res.data.access_token, expires)
              location.replace(searchLocation || '/')
              setErrorLogin(false)
            })
            .catch((error) => {
              console.log('error: ', error)
              setErrorLogin(true)
            })
        } else {
          ApiCore.post(`${REGISTER_ENDPOINT}`, loginRef.current)
            .then((res) => {
              if (!res.status) {
                // dispatchNotification('error', res?.response.data.msg)
                return setErrorLogin(true)
              }
              setAuth(res.data.user)
              dispatchNotification('success', res.data.msg)
              const expires = new Date(24 * 60 * 60).toUTCString()
              const searchLocation = new URLSearchParams(location.search).get('redirectUrl')
              setCookie('access', res.data.access_token, expires)
              location.replace(searchLocation || '/')
              setErrorLogin(false)
            })
            .catch((error) => {
              console.log('error: ', error)
              setErrorLogin(true)
            })
        }
      }
    } catch (error) {
      console.log(error)
      setErrorLogin(true)
    }
  }

  const BUILD_VERSION = document.querySelector<HTMLMetaElement>('meta[name="BUILD_VERSION"]')?.content || '1.0.0'
  const BUILD_TIME =
    document.querySelector<HTMLMetaElement>('meta[name="BUILD_TIME"]')?.content || new Date().toDateString()

  const renderSingin = () => {
    return (
      <>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Email
          </Typography>
          <TextField
            {...register('email')}
            className={clsx(styles.inputText, errorLogin && styles.inputError)}
            id='outlined-basic'
            variant='outlined'
            placeholder='Email address'
            onChange={(evt) => (loginRef.current.email = evt.currentTarget.value)}
          />
          {errorLogin && <HelperText message='Please enter a valid email address' />}
        </div>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Password
          </Typography>
          <div>
            <div className={styles.inputPasswordWrapper}>
              <TextField
                {...register('password')}
                className={clsx(styles.inputText, errorLogin && styles.inputError)}
                id='outlined-basic'
                variant='outlined'
                placeholder='Password'
                type={toggleIconEye ? 'password' : 'text'}
                onChange={(evt) => (loginRef.current.password = evt.currentTarget.value)}
              />
              <IconButton
                className={styles.endButton}
                onClick={() => {
                  toggleIconPassword(toggleIconEye)
                }}>
                {toggleIconEye ? <VisibilityOff /> : <img src={eyeOnIc} />}
              </IconButton>
            </div>
            {errorLogin && <HelperText message='Please enter a valid password' />}
          </div>
        </div>
      </>
    )
  }

  const renderSignup = () => {
    return (
      <>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            User Name
          </Typography>
          <TextField
            {...register('username')}
            className={clsx(styles.inputText, errorLogin && styles.inputError)}
            id='outlined-basic'
            variant='outlined'
            placeholder='User name '
            onChange={(evt) => (loginRef.current.username = evt.currentTarget.value)}
          />
          {errorLogin && <HelperText message='Please enter a valid user name ' />}
        </div>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Full Name
          </Typography>
          <TextField
            {...register('fullname')}
            className={clsx(styles.inputText, errorLogin && styles.inputError)}
            id='outlined-basic'
            variant='outlined'
            placeholder='Full name'
            onChange={(evt) => (loginRef.current.fullname = evt.currentTarget.value)}
          />
          {errorLogin && <HelperText message='Please enter a valid full name ' />}
        </div>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Email
          </Typography>
          <TextField
            {...register('email')}
            className={clsx(styles.inputText, errorLogin && styles.inputError)}
            id='outlined-basic'
            variant='outlined'
            placeholder='Email address'
            onChange={(evt) => (loginRef.current.email = evt.currentTarget.value)}
          />
          {errorLogin && <HelperText message='Please enter a valid email address' />}
        </div>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Password
          </Typography>
          <div>
            <div className={styles.inputPasswordWrapper}>
              <TextField
                {...register('password')}
                className={clsx(styles.inputText, errorLogin && styles.inputError)}
                id='outlined-basic'
                variant='outlined'
                placeholder='Password'
                type={toggleIconEye ? 'password' : 'text'}
                onChange={(evt) => (loginRef.current.password = evt.currentTarget.value)}
              />
              <IconButton
                className={styles.endButton}
                onClick={() => {
                  toggleIconPassword(toggleIconEye)
                }}>
                {toggleIconEye ? <VisibilityOff /> : <img src={eyeOnIc} />}
              </IconButton>
            </div>
            {errorLogin && <HelperText message='Please enter a valid password' />}
          </div>
        </div>
        <div className={styles.textField}>
          <Typography variant='subtitle2' className={styles.textLabelForm}>
            Confirm Password
          </Typography>
          <div>
            <div className={styles.inputPasswordWrapper}>
              <TextField
                {...register('confirm-password')}
                className={clsx(styles.inputText, errorLogin && styles.inputError)}
                id='outlined-basic'
                variant='outlined'
                placeholder='Confirm Password'
                type={'password'}
                onChange={(evt) => (loginRef.current.confirmPassword = evt.currentTarget.value)}
              />
            </div>
            {errors.confirm_password && <HelperText message='Passwords do not match' />}
          </div>
        </div>
      </>
    )
  }

  const forgotPassword = () => {
    return (
      <div className={styles.textField}>
        <Typography variant='subtitle2' className={styles.textLabelForm}>
          Send Email
        </Typography>
        <TextField
          {...register('email')}
          className={clsx(styles.inputText, errorLogin && styles.inputError)}
          id='outlined-basic'
          variant='outlined'
          placeholder='Email address'
          onChange={(evt) => (loginRef.current.email = evt.currentTarget.value)}
        />
        {errorLogin && <HelperText message='Please enter a valid email address' />}
      </div>
    )
  }

  const handleSendEmail = async () => {
    console.log(loginRef.current)

    if (loginRef.current.email) {
      ApiCore.post(`${FORGOT_PASS_ENDPOINT}`, loginRef.current)
        .then((res) => {
          if (!res.status) {
            // dispatchNotification('error', res?.response.data.msg)
            return setErrorLogin(true)
          }
          dispatchNotification('success', res.data.msg)
          setErrorLogin(false)
        })
        .catch((error) => {
          console.log('error: ', error)
          setErrorLogin(true)
        })
    }
  }

  return (
    <div className={styles.appLoginWrapper}>
      <div className={styles.LoginMainContentFormWrapper}>
        <div className={styles.AuthMainContent}>
          <div className={styles.Header}>
            <img src={LogoIcon} className={styles.Logo} />
            <Typography variant='subtitle2' className={styles.textTitleLogo}>
              Dashboard Kit
            </Typography>
            <Typography variant='subtitle2' className={styles.textLoginHeader} color='#CCCEDA'>
              Log In to Dashboard Kit
            </Typography>
            <Typography variant='subtitle2' className={styles.textDescription} color='#9FA2B4'>
              Enter your email and password below
            </Typography>
            <div>
              <IconButton color='primary' onClick={googleSignIn}>
                <GoogleIcon />
              </IconButton>
            </div>
          </div>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            {isSignin ? renderSingin() : renderSignup()}
            <Button className={styles.buttonSubmit} type='submit' variant='contained'>
              {isSignin ? 'Login' : 'Signup'}
            </Button>
          </form>
          <Typography
            variant='subtitle1'
            sx={{ cursor: 'pointer', marginTop: '20px' }}
            className={styles.textTitleLogo}
            onClick={() => {
              setIsSignin(!isSignin)
              setErrorLogin(false)
            }}>
            {isSignin ? 'Signup' : 'Signin'}
          </Typography>
          <Popup open={isShowForgotPassword} btnText='Submit' titlePopup='forgot password' onClick={handleSendEmail}>
            {forgotPassword()}
          </Popup>
          <Typography
            sx={{ cursor: 'pointer', marginTop: '20px' }}
            onClick={() => setIsShowForgotPassword(!isShowForgotPassword)}>
            forgot password
          </Typography>
          <p className={styles.version}>{`Version ${BUILD_VERSION} | Build ${BUILD_TIME}`}</p>
        </div>
      </div>
    </div>
  )
}
