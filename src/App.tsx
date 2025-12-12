import { Route, Routes } from 'react-router-dom';

import PageRoutes from '@/pages';

import '@/App.css';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route index element={<PageRoutes.IndexPage/>}/>
      </Routes>
    </div>
  )
}

export default App
