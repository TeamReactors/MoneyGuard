import { Suspense } from 'react'
import styles from './App.module.css'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../pages/DashBoardPage'
import LoginPage from '../../pages/LoginPage'
import RegistationPage from '../../pages/RegistationPage'
import RestrictedRoute from '../RestrictedRoute'
import StatisticsTab from '../../pages/StatisticsTab'
import CurrencyTab from '../CurrencyTab/CurrencyTab'

function App() {


  return (
    <div className={styles.App}>
      <Suspense>
        <Routes>
          <Route path="/" element={<RestrictedRoute redirectTo="/login"><DashboardPage /></RestrictedRoute>}>
          </Route>
          <Route path="/login" element={<RestrictedRoute redirectTo="/"><LoginPage /></RestrictedRoute>}>
          </Route>
          <Route path="/register" element={<RestrictedRoute redirectTo="/"><RegistationPage /></RestrictedRoute>}>
          </Route>
          <Route path="/statistics" element={<StatisticsTab />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/currency" element={<CurrencyTab />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
