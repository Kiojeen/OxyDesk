import { cn } from '~/lib/utils'
import { Minus, Square, X, Settings, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TitleBarProps {
  title?: string
  subtitle?: string
  className?: string
}

export function TitleBar({ title = 'My App', subtitle, className }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isElectron, setIsElectron] = useState(false)

  // Check if running in Electron
  useEffect(() => {
    // Check if window.api.windowControls exists (only in Electron)
    setIsElectron(!!window.api?.windowControls)
  }, [])

  const handleMinimize = () => {
    if (isElectron) {
      window.api.windowControls.minimize()
    }
  }

  const handleMaximize = () => {
    if (isElectron) {
      window.api.windowControls.maximize()
      setIsMaximized(!isMaximized)
    }
  }

  const handleClose = () => {
    if (isElectron) {
      window.api.windowControls.close()
      console.log('Close button clicked')
    }
  }
  if (!isElectron) return null
  
  return (
    <div
      className={cn(
        'flex items-center justify-between h-12 bg-gradient-to-b from-card to-background border-b border-border px-4 select-none shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm opacity-90" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground leading-tight">{title}</span>
          {subtitle && (
            <span className="text-xs text-muted-foreground leading-tight">{subtitle}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Action buttons */}
        <button className="w-8 h-8 rounded-md hover:bg-muted transition-colors duration-200 flex items-center justify-center group">
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button className="w-8 h-8 rounded-md hover:bg-muted transition-colors duration-200 flex items-center justify-center group">
          <Settings className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        <div className="w-px h-4 bg-border mx-2" />

        <button
          className="w-8 h-8 rounded-md hover:bg-muted transition-all duration-200 flex items-center justify-center group hover:scale-105"
          onClick={handleMinimize}
        >
          <Minus className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button
          className="w-8 h-8 rounded-md hover:bg-muted transition-all duration-200 flex items-center justify-center group hover:scale-105"
          onClick={handleMaximize}
        >
          <Square className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        <button
          className="w-8 h-8 rounded-md hover:bg-destructive transition-all duration-200 flex items-center justify-center group hover:scale-105"
          onClick={handleClose}
        >
          <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive-foreground transition-colors" />
        </button>
      </div>
    </div>
  )
}
