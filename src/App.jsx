import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import BlindsOrder from './pages/BlindsOrder.jsx';
import CameraOrder from './pages/CameraOrder.jsx';
import ChandelierOrder from './pages/ChandelierOrder.jsx';
import Contact from './pages/Contact.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import NotFound from './pages/NotFound.jsx';

import AdminLogin from './admin/AdminLogin.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminProducts from './admin/AdminProducts.jsx';
import AdminOrders from './admin/AdminOrders.jsx';

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Mijozlar uchun sayt */}
      <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
      <Route path="/katalog/:category" element={<SiteLayout><Catalog /></SiteLayout>} />
      <Route path="/mahsulot/:id" element={<SiteLayout><ProductDetail /></SiteLayout>} />
      <Route path="/buyurtma/jalyuzi-parda" element={<SiteLayout><BlindsOrder /></SiteLayout>} />
      <Route path="/buyurtma/videokamera" element={<SiteLayout><CameraOrder /></SiteLayout>} />
      <Route path="/buyurtma/lyustra" element={<SiteLayout><ChandelierOrder /></SiteLayout>} />
      <Route path="/buyurtma-holati" element={<SiteLayout><OrderTracking /></SiteLayout>} />
      <Route path="/aloqa" element={<SiteLayout><Contact /></SiteLayout>} />

      {/* Admin panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="mahsulotlar" element={<AdminProducts />} />
        <Route path="buyurtmalar" element={<AdminOrders />} />
      </Route>

      <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
    </Routes>
  );
}
