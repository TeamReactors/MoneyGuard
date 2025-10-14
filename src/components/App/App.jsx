import { Suspense, lazy } from 'react'
import styles from './App.module.css'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../pages/DashboardPage'
import RegistationPage from '../../pages/RegistationPage'
import RestrictedRoute from '../RestrictedRoute'
import StatisticsTab from '../../pages/StatisticsTab'
import CurrencyTab from '../CurrencyTab/CurrencyTab'
import PrivateRoute from '../PrivateRoute'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'

const LoginPage = lazy(() => import("../../pages/LoginPage"))

function App() {


  return (
    <div className={styles.App}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<PrivateRoute redirectTo="/login"><DashboardPage /></PrivateRoute>}>
          </Route>
          <Route path="/login" index element={<RestrictedRoute redirectTo="/dashboard" component={<LoginPage />} />} />

          <Route path="/register" element={<RestrictedRoute redirectTo="/"><RegistationPage /></RestrictedRoute>}>
          </Route>
          <Route path="/statistics" element={<StatisticsTab />} />
          <Route path="/header" element={<Header />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/currency" element={<CurrencyTab />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
