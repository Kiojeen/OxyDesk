import './styles/globals.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from '~/pages/add'
import Accounts from '~/pages/accounts'
import ClientsInformation from '~/pages/clients-information'
import OfficeExpenses from '~/pages/office-expenses'
import './i18n'
import App from './App'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Add />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="clients-information" element={<ClientsInformation />} />
            <Route path="office-expenses" element={<OfficeExpenses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
