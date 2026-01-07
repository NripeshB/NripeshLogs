import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/App'
import Provider from '../src/app/providers'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
)
