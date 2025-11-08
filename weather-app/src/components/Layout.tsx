import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">ac_unit</span>
              <h1 className="text-2xl font-bold">WeatherWise</h1>
            </Link>

            <nav className="flex items-center gap-6">
              <Link 
                to="/" 
                className={`hover:text-primary transition-colors ${isHome ? 'text-primary font-bold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/settings" 
                className={`hover:text-primary transition-colors ${location.pathname === '/settings' ? 'text-primary font-bold' : ''}`}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout