import './styles/globals.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AddRecord from './pages/add-record'
import Accounts from '~/pages/accounts'
import ClientsInformation from '~/pages/clients-information'
import OfficeExpenses from '~/pages/office-expenses'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AddRecord />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="clients-information" element={<ClientsInformation />} />
            <Route path="office-expenses" element={<OfficeExpenses />} />
          </Route>
        </Routes>
      </HashRouter>
  </StrictMode>
)
