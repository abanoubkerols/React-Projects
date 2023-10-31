import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import Product from './pages/product'
// import Pricing from './pages/Pricing'
// import NotFound from './pages/NotFound'
// import AppLayout from './pages/appLayout'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
import CityList from './components/CityList'


import CountriesList from './components/CountriesList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/fakeAuth'
import ProtectedRoute from './pages/protectedRoute'
import { Suspense, lazy } from 'react'
import SpinnerFullPage from './components/SpinnerFullPage'

const Homepage = lazy(() =>import('./pages/Homepage')) 
const Product = lazy(() =>import('./pages/Product')) 
const Pricing = lazy(() =>import('./pages/Pricing')) 
const AppLayout = lazy(() =>import('./pages/AppLayout')) 
const NotFound = lazy(() =>import('./pages/NotFound')) 
const Login = lazy(() =>import('./pages/Login')) 

export default function App () {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route
              path='app'
              element={
                <ProtectedRoute>
                  <AppLayout /> 
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='cities' />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountriesList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}
