import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, assignMaster, ORDER_STATUSES, STATUS_LABELS } from '../firebase/orders.js';
import StatusBadge from '../components/StatusBadge.jsx';

const TYPE_LABELS = {
  jalyuzi_parda: 'Jalyuzi / Parda',
  videokamera: 'Videokamera',
  lyustra: 'Lyustra',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('barchasi');
  const [masterInputs, setMasterInputs] = useState({});

  const load = () => {
    setLoading(true);
    getAllOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    load();
  };

  const handleAssign = async (id) => {
    const name = masterInputs[id];
    if (!name) return;
    await assignMaster(id, name);
    load();
  };

  const filtered = filter === 'barchasi' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="font-display text-3xl text-ivory mb-6">Buyurtmalar</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('barchasi')}
          className={`px-3 py-1.5 rounded-sm text-xs border ${filter === 'barchasi' ? 'border-gold text-gold' : 'border-line text-ivory/60'}`}
        >
          Barchasi
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-sm text-xs border ${filter === s ? 'border-gold text-gold' : 'border-line text-ivory/60'}`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ivory/50">Yuklanmoqda...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((o) => (
            <div key={o.id} className="border border-line rounded-sm p-5 bg-charcoal">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                <div>
                  <div className="text-ivory font-medium">
                    {TYPE_LABELS[o.type] || o.type} {o.productName && `— ${o.productName}`}
                  </div>
                  <div className="text-xs text-ivory/40 mt-0.5">{new Date(o.createdAt).toLocaleString('uz-UZ')}</div>
                </div>
                <StatusBadge status={o.status} />
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ivory/70 mb-4">
                {o.phone && <div>Tel: {o.phone}</div>}
                {o.address && <div>Manzil: {o.address}</div>}
                {o.roomType && <div>Xona: {o.roomType}</div>}
                {o.width && o.height && <div>O'lcham: {o.width}×{o.height} sm</div>}
                {o.cameraCount && <div>Kamera soni: {o.cameraCount}</div>}
                {o.placement && <div>Joylashuv: {o.placement}</div>}
                {o.masterName && <div>Usta: {o.masterName}</div>}
                {o.notes && <div className="sm:col-span-2">Izoh: {o.notes}</div>}
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                  className="bg-ink border border-line rounded-sm px-3 py-1.5 text-xs text-ivory"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>

                <input
                  placeholder="Usta ismi"
                  value={masterInputs[o.id] ?? o.masterName ?? ''}
                  onChange={(e) => setMasterInputs((m) => ({ ...m, [o.id]: e.target.value }))}
                  className="bg-ink border border-line rounded-sm px-3 py-1.5 text-xs text-ivory w-32"
                />
                <button onClick={() => handleAssign(o.id)} className="text-xs text-gold">Biriktirish</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-ivory/40 text-sm">Bu bo'limda buyurtma yo'q.</div>}
        </div>
      )}
    </div>
  );
}
