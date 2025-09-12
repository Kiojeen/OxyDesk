import { useState, useEffect } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type NavigationButtonProps = {
  text: string
  icon?: React.ReactNode
  active?: boolean
  onClick: () => void
  badge?: number
}

const NavigationButton = ({ text, icon, active, onClick }: NavigationButtonProps) => {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          onClick()
        }}
        className={`
          relative rounded-lg py-3 px-4 w-full font-medium tracking-wide transition-all duration-300 ease-in-out
          transform flex items-center justify-between group
          ${
            active
              ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg ring-2 ring-orange-300 scale-[1.02] hover:scale-[1.03] hover:shadow-xl'
              : 'bg-gradient-to-r from-neutral-700 to-neutral-600 text-gray-200 hover:from-orange-300 hover:to-orange-400 hover:text-white hover:shadow-md'
          }
        `}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span
              className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
            >
              {icon}
            </span>
          )}

          <span className={`${active ? 'drop-shadow-[0_1px_4px_rgba(255,255,255,0.6)]' : ''}`}>
            {text}
          </span>
        </div>

        {active && (
          <span className="absolute inset-0 rounded-lg bg-orange-400/20 animate-pulse pointer-events-none"></span>
        )}
      </button>
    </div>
  )
}

const SideBarTitle = (props: { text: string; className?: string }) => {
  return (
    <h1
      className={`
        text-2xl md:text-3xl font-extrabold mb-6 text-center select-none tracking-wider
        text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500
        drop-shadow-md transition-all duration-300 ease-in-out
        hover:scale-105
        ${props.className || ''}
      `}
    >
      {props.text}
    </h1>
  )
}

type SideBarProps = {
  buttons: {
    id: string
    text: string
    icon: React.ReactNode
    to: string
  }[]
}

export default function SideBar(props: SideBarProps) {
  const navigate = useNavigate()
  const [activeTabId, setActiveTabId] = useState('tab_add_record')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const sidebarContent = (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        {/* Icon Section */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-700 transition-colors duration-200 text-orange-400"
            aria-label="Close sidebar"
          >
            <X size={28} />
          </button>
        </div>

        {/* Title Section */}

        <div className="mt-3 text-center">
          <SideBarTitle text="برنامج حسابات المكتب" />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
        {props.buttons.map((btn) => (
          <NavigationButton
            key={btn.id}
            text={btn.text}
            icon={btn.icon}
            active={activeTabId === btn.id}
            onClick={() => {
              setActiveTabId(btn.id)
              navigate(btn.to)
            }}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-neutral-700 space-y-2">
        {/* User Profile Section */}

        <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center shadow-md">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">السيد علي المحترم</p>
              <p className="text-gray-400 text-sm">مدير النظام</p>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200">
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-neutral-800 rounded-lg text-orange-400 shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className="
        hidden md:flex flex-col
        bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900
        border-r border-orange-900/20
        h-screen
        transition-all duration-300 ease-in-out
        shadow-2xl w-72 p-6
      "
      >
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
        md:hidden fixed top-0 right-0 h-full z-50
        bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900
        w-72 p-6
        transform transition-transform duration-300 ease-in-out
        shadow-2xl
        ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        {sidebarContent}
      </div>
    </>
  )
}
