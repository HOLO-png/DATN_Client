import ReleaseNotes from 'pages/release-notes'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import DeviceManagement from './pages/device'
import Login from './pages/login'
import Monitoring from './pages/monitoring'
import NotFound from './pages/not-found'
import Setting from './pages/setting'
import UserManagement from './pages/user'
import './App.css'

import { getCookie, NotificationProvider, ThemeProvider, useAuthStore } from './sdk'

function App() {
  const [isLogged, setIsLogged] = useState<boolean | undefined>(false)
  const accessToken = getCookie('access') as string

  console.log(accessToken)

  if (isLogged === undefined) return <></>
  const setAuth = useAuthStore((store) => store.setAuth)
  const auth = useAuthStore((store) => store.auth)

  console.log(auth)

  useEffect(() => {
    if (accessToken) {
      try {
        const decodeToken = JSON.parse(atob(accessToken.split('.')[1]))
        setAuth(decodeToken)
      } catch (e) {}
      const hasAccess = Boolean(accessToken)
      setIsLogged(hasAccess)
      const current = location.pathname
      if (hasAccess && !current.includes('login')) {
        return
      } else if (hasAccess && current.includes('login')) {
        const redirectUrl = new URLSearchParams(location.search).get('redirectUrl') || '/'
        if (redirectUrl) window.history.replaceState({}, '', redirectUrl)
      } else {
        if (current.includes('login')) return
        window.history.replaceState({}, '', '/login' + (current !== '/' ? '?redirectUrl=' + current : ''))
      }
    }
  }, [accessToken])

  return (
    <ThemeProvider>
      <>
        <BrowserRouter>{isLogged ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</BrowserRouter>
        <NotificationProvider />
      </>
    </ThemeProvider>
  )
}

function AuthorizedRoutes() {
  const isRoleAdmin = useAuthStore((store) => store.auth?.role === 'ADMIN')
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/monitoring' element={<Monitoring />} />
      {isRoleAdmin && <Route path='/setting' element={<Setting />} />}
      <Route path='/devices' element={<DeviceManagement />} />
      {isRoleAdmin && <Route path='/user' element={<UserManagement />} />}
      <Route path='/release-notes' element={<ReleaseNotes />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

function UnauthorizedRoutes() {
  const accessToken = getCookie('access') as string
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      {!Boolean(accessToken) && (
        <Route path='*' element={<Navigate to='/login' replace state={{ from: location.pathname }} />} />
      )}
    </Routes>
  )
}

export default App
