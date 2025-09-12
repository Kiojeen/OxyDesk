import SideBar from './components/sidebar'
import { Outlet } from 'react-router-dom'
import { FilePlus, Users, Wallet, CreditCard } from 'lucide-react'

const tabs = [
  {
    id: 'tab_add_record',
    text: 'اضافة تقرير',
    to: '/',
    icon: <FilePlus />
  },
  {
    id: 'tab_clients_info',
    text: 'معلومات الزبائن',
    to: '/clients-information',
    icon: <Users />
  },
  {
    id: 'tab_accounting',
    text: 'الحسابات',
    to: '/accounts',
    icon: <Wallet />
  },
  {
    id: 'tab_spendings',
    text: 'صرفيات المكتب',
    to: '/office-expenses',
    icon: <CreditCard />
  }
]

export default function App() {
  return (
    <div className="flex h-screen" dir="rtl" lang="ar">
      <SideBar buttons={tabs} />
      {/* Main content */}
      <div className="bg-gray-50 flex-1 p-6 text-gray-900 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
