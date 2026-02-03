import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'  // ✅ ADD THIS
import store from './store/store.js'
import './styles/globals.css'  
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)
