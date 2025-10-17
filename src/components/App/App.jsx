import { Suspense, lazy, useEffect } from 'react'
import styles from './App.module.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import RestrictedRoute from '../RestrictedRoute'
import StatisticsTab from '../../pages/StatisticsTab'
import CurrencyTab from '../CurrencyTab/CurrencyTab'
import Currency from '../Currency/Currency'
import PrivateRoute from '../PrivateRoute'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { refreshUser } from '../../redux/auth/operations'
import { selectIsRefreshing } from '../../redux/auth/selectors'

const LoginPage = lazy(() => import("../../pages/LoginPage"))
const RegistationPage = lazy(() => import("../../pages/RegistationPage"))
const DashboardPage = lazy(() => import("../../pages/DashboardPage"))

function App() {
  const dispatch = useDispatch()
  const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  return isRefreshing ? (
    <Loader></Loader>
  ) : (

    <div className={styles.App}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/nav" element={<Navigation />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/dashboard" component={<LoginPage />} />} />
          <Route path="/register" element={<RestrictedRoute redirectTo="/dashboard" component={<RegistationPage />} />} />
          <Route path="/statistics" element={<StatisticsTab />} />
          <Route path="/dashboard" element={<PrivateRoute redirectTo="/login" component={<DashboardPage />} />} />
          {/* <Route path="/" element={<button><CurrencyTab /></button>} /> */}
          <Route path="/currency" element={<Currency />} />
          <Route path="/header" element={<Header />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App