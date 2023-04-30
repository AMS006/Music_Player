import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store = {store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
