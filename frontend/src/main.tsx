import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/appContext.tsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>

        <BrowserRouter>
          <Routes>

            <Route path='/*' element={<App />} />

          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
