import React from 'react'
import './App.scss'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { Pages } from './pages'
import * as firebase from 'firebase/app'

import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './firebase'

axios.defaults.baseURL = 'https://do-granicy-default-rtdb.asia-southeast1.firebasedatabase.app'
const app = firebase.initializeApp(firebaseConfig)
export const storage = getStorage(app);


function App() {

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={<Pages.Main />}  
        />
        <Route 
          path='/add/'
          element={<Pages.Add />}
        />
      </Routes>
    </div>
  )
}

export default App