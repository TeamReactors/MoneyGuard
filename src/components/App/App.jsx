import { Suspense, lazy, useEffect } from "react";
import styles from "./App.module.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RestrictedRoute from "../RestrictedRoute";
import StatisticsTab from "../../pages/StatisticsTab";
import Currency from "../Currency/Currency";
import PrivateRoute from "../PrivateRoute";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { fetchTransactions } from "../../redux/transactions/operations";
import { Toaster } from "react-hot-toast";
import NotFound from "../NotFound/NotFound";
import useMediaQuery from "../../hooks/useMediaQuery";

const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistationPage = lazy(() => import("../../pages/RegistationPage"));
const DashboardPage = lazy(() => import("../../pages/Dashboard/DashboardPage"));
const TransactionList = lazy(() => import("../TransactionsList/TransactionsList"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  
  
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader></Loader>
  ) : (
    <div className={styles.App}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/dashboard"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/dashboard"
                component={<RegistationPage />}
              />
            }
          />
          
     
          <Route
            path="/dashboard"
            element={
              <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
            }
          >
            <Route index element={<TransactionList />} />
            <Route path="statistics" element={<StatisticsTab />} />
           
            <Route 
              path="currency" 
              element={
                isMobile ? <Currency /> : <Navigate to="/dashboard" replace />
              } 
            />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;