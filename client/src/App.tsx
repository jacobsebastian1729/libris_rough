import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import './App.css';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './components/Books/BookDetail';
import MyAchievement from './components/User/MyAchievement';
import UserInformation from './components/User/UserInformation';
import BookShelves from './pages/BookShelves';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MyBooks from './pages/MyBooks';
import OneBookShelf from './components/BookShelves/OneBookShelf';
import LogIn from './components/User/LogIn';
import Register from './components/User/Register';
import Friends from './components/Friends/Friends';
import DashBoard from './components/DashBoard/DashBoard';
import UserBoard from './components/DashBoard/UserBoard';
import BooksBoard from './components/DashBoard/BooksBoard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Subscription from './components/Subscription/Subscription';

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  colorMode: 'light',
});

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div className='App' style={{backgroundColor: (mode === 'dark') ? '#3e2723' : 'white', color: (mode === 'dark') ? 'white' : 'black' }}>
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/:bookId' element={<BookDetail />} />
            <Route path='/mybooks' element={<MyBooks />} />
            <Route path='/:userId/books' element={<MyBooks />} />
            <Route path='/:userId/achievment' element={<MyAchievement />} />
            <Route path='/:userId/setting' element={<UserInformation mode={mode}/>} />
            <Route path='/bookshelves/all' element={<BookShelves />} />
            <Route path='/login' element={<LogIn mode={mode}/>} />
            <Route path='/register' element={<Register mode={mode}/>} />
            <Route path='/:userId/friends' element={<Friends />} />
            <Route
              path='/bookshelves/:bookshelvesId'
              element={<OneBookShelf />}
            />
            <Route path='/dashboard' element={<DashBoard mode={mode}/>} />
            <Route path='/dashboard/users' element={<UserBoard />} />
            <Route path='/dashboard/books' element={<BooksBoard />} />
            <Route path='/subscription' element={<Subscription mode={mode}/>} />
          </Routes>
          <Footer mode={mode}/>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
