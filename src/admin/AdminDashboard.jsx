import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../firebase/orders.js';
import { getAllProducts } from '../firebase/products.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllOrders(), getAllProducts()])
      .then(([o, p]) => {
        setOrders(o);
        setProducts(p);
      })
      .finally(() => setLoading(false));
  }, []);

  const newOrders = orders.filter((o) => o.status === 'yangi');

  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="font-display text-3xl text-ivory mb-6">Umumiy holat</h1>

      {loading ? (
        <p className="text-ivory/50">Yuklanmoqda...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="border border-line rounded-sm p-5 bg-charcoal">
              <div className="text-3xl font-display text-gold">{orders.length}</div>
              <div className="text-sm text-ivory/55 mt-1">Jami buyurtmalar</div>
            </div>
            <div className="border border-line rounded-sm p-5 bg-charcoal">
              <div className="text-3xl font-display text-gold">{newOrders.length}</div>
              <div className="text-sm text-ivory/55 mt-1">Yangi buyurtmalar</div>
            </div>
            <div className="border border-line rounded-sm p-5 bg-charcoal">
              <div className="text-3xl font-display text-gold">{products.length}</div>
              <div className="text-sm text-ivory/55 mt-1">Mahsulotlar</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl text-ivory">So'nggi buyurtmalar</h2>
            <Link to="/admin/buyurtmalar" className="text-sm text-gold">Barchasini ko'rish →</Link>
          </div>
          <div className="border border-line rounded-sm divide-y divide-line">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="text-ivory text-sm capitalize">{o.type?.replace('_', ' ')} — {o.phone}</div>
                  <div className="text-xs text-ivory/40">{new Date(o.createdAt).toLocaleString('uz-UZ')}</div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
            {orders.length === 0 && <div className="p-6 text-ivory/40 text-sm">Hozircha buyurtma yo'q.</div>}
          </div>
        </>
      )}
    </div>
  );
}
