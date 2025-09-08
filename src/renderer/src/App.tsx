import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { AppSidebar } from '~/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { TitleBar } from './components/title-bar'

export default function OfficeForm() {
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  return (
    <div className="min-h-screen bg-background pt-12">
      <TitleBar
        title="OxyDesk"
        subtitle="Point of sells"
        className="fixed top-0 left-0 w-full z-50"
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-8">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
  return (
    <div>
      <TitleBar title="OxyDesk" subtitle="Point of sells" />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
        </div> */}
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
