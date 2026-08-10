import React, { useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import StatusBadge from '../components/StatusBadge.jsx';
import { Field, TextInput } from '../components/FormField.jsx';

export default function OrderTracking() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'orders'), where('phone', '==', phone), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl text-ivory mb-2">Buyurtmani kuzatish</h1>
      <p className="text-ivory/55 mb-8">Buyurtma berishda ko'rsatgan telefon raqamingizni kiriting.</p>

      <form onSubmit={search} className="flex gap-3 mb-10">
        <Field label="" className="flex-1">
          <TextInput
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 000 00 00"
            className="w-full"
          />
        </Field>
        <button className="bg-gold text-ink px-6 rounded-sm font-medium hover:bg-goldbright transition-colors h-fit self-end mb-1.5">
          Qidirish
        </button>
      </form>

      {loading && <p className="text-ivory/50">Qidirilmoqda...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {orders && orders.length === 0 && (
        <div className="border border-line rounded-sm p-8 text-center text-ivory/50">
          Bu raqam bo'yicha buyurtma topilmadi.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {orders?.map((o) => (
          <div key={o.id} className="border border-line rounded-sm p-5 bg-charcoal">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-ivory font-medium capitalize">{o.type?.replace('_', ' ')}</div>
                {o.productName && <div className="text-xs text-ivory/50">{o.productName}</div>}
              </div>
              <StatusBadge status={o.status} />
            </div>
            {o.address && <div className="text-xs text-ivory/50 mt-2">Manzil: {o.address}</div>}
            {o.masterName && <div className="text-xs text-ivory/50">Usta: {o.masterName}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
