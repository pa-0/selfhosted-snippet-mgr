import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { IconoirProvider } from 'iconoir-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <IconoirProvider
      iconProps={{
        color: 'text-lighter dark:text-lighter',
        strokeWidth: 1.5,
        width: '1.5em',
        height: '1.5em',
      }}
    >
      <App />
    </IconoirProvider>
  </BrowserRouter>
)
