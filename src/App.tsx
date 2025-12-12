import { Route, Routes } from 'react-router-dom';
import { PATH } from '@/utils/path';

import PageRoutes from '@/pages';

import '@/App.css';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route index element={<PageRoutes.IndexPage/>}/>
        <Route path={PATH.LOGIN} element={<PageRoutes.LoginPage/>}/>
        <Route path={PATH.HOME} element={<PageRoutes.HomePage/>}/>
        <Route path={PATH.JOIN} element={<PageRoutes.JoinPage/>}/>
      </Routes>
    </div>
  )
}

export default App
