'use client'

import * as React from 'react'
import {
  Command,
  MessageCircleQuestion,
  Settings2,
  PlusIcon,
  BookMarked,
  Wallet,
  CircleUser,
  AudioWaveform
} from 'lucide-react'

import { NavMain } from '~/components/nav-main'
import { NavSecondary } from '~/components/nav-secondary'
import { TeamSwitcher } from '~/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '~/components/ui/sidebar'
import { NavUser } from './nav-user'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  const data = {
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise'
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup'
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free'
      }
    ],
    navMain: [
      {
        title: t('sidebar.add'),
        to: '/',
        icon: PlusIcon,
        isActive: true
      },
      {
        title: t('sidebar.clientsInformation'),
        to: '/clients-information',
        icon: BookMarked,
        isActive: false
      },
      {
        title: t('sidebar.accounts'),
        to: '/accounts',
        icon: CircleUser,
        isActive: false
      },
      {
        title: t('sidebar.officeExpenses'),
        to: '/office-expenses',
        icon: Wallet,
        isActive: false
      }
    ],
    navSecondary: [
      {
        title: t('sidebar.settings'),
        url: '#',
        icon: Settings2
      },
      {
        title: t('sidebar.help'),
        url: '#',
        icon: MessageCircleQuestion
      }
    ]
  }

  return (
    <Sidebar
      className="border-r-0"
      side={i18n.language === 'en' ? 'left' : 'right'}
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <Button variant="outline" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'العربية' : 'English'}
        </Button>
        <NavUser
          user={{
            name: 'John Doe',
            email: 'm@example.com',
            avatar: ''
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
