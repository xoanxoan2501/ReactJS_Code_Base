import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './views/styles/styles.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Bounce } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'

// * Configuring the redux persist
import store, { persistor } from '@/core/store/redux.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '@/theme.tsx'
import { GlobalStyles } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <CssVarsProvider theme={theme}>
          <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
          <App />
          <CssBaseline />
        </CssVarsProvider>
      </PersistGate>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </Router>
)
