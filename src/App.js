import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RequestPage from './pages/RequestPage';
import ReservationsPage from './pages/ReservationsPage';
import ContactPage from './pages/ContactPage';
// import LoadEnumPage from './pages/LoadEnumPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/request" element={<RequestPage/>} />
        <Route path="/reservations" element={<ReservationsPage/>} />
        <Route path="/contact/" element={<ContactPage/>} />
        {/* <Route path="/load/" element={<LoadEnumPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
} 

export default App;