import AsyncTabs from './components/AsyncTabs'
import './App.css'

function App() {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>Async Tabs</h1>
      </header>

      <main>
        <AsyncTabs tabs={tabs} />
      </main>
    </div>
  )
}

export default App
