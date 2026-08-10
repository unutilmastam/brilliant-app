import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../firebase/orders.js';
import { Field, TextInput, TextArea, Select } from '../components/FormField.jsx';

export default function ChandelierOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: location.state?.productName || '',
    wantsInstallation: 'ha',
    ceilingHeight: '',
    address: '',
    phone: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createOrder({ type: 'lyustra', ...form });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <div className="text-gold text-4xl mb-4">◆</div>
        <h1 className="font-display text-3xl text-ivory mb-3">Buyurtmangiz qabul qilindi</h1>
        <p className="text-ivory/60 mb-8">Yetkazib berish va o'rnatish vaqti operator orqali kelishiladi.</p>
        <button onClick={() => navigate('/')} className="bg-gold text-ink px-6 py-3 rounded-sm font-medium">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="font-display text-4xl text-ivory mb-2">Lyustra buyurtmasi</h1>
      <p className="text-ivory/55 mb-8">Tanlangan lyustrani yetkazib beramiz va xohlasangiz o'rnatib ham beramiz.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {form.productName && (
          <Field label="Tanlangan mahsulot">
            <TextInput value={form.productName} readOnly className="opacity-70" />
          </Field>
        )}

        <Field label="O'rnatish xizmati kerakmi">
          <Select value={form.wantsInstallation} onChange={set('wantsInstallation')}>
            <option value="ha">Ha, o'rnatib bering</option>
            <option value="yoq">Yo'q, faqat yetkazib bering</option>
          </Select>
        </Field>

        {form.wantsInstallation === 'ha' && (
          <Field label="Shift balandligi (metr)" hint="Ixtiyoriy — ustaga yordam beradi">
            <TextInput type="number" min="0" step="0.1" value={form.ceilingHeight} onChange={set('ceilingHeight')} placeholder="masalan, 2.8" />
          </Field>
        )}

        <Field label="Manzil">
          <TextInput required value={form.address} onChange={set('address')} placeholder="Shahar, tuman, ko'cha, uy" />
        </Field>

        <Field label="Telefon raqami">
          <TextInput required value={form.phone} onChange={set('phone')} placeholder="+998 90 000 00 00" />
        </Field>

        <Field label="Qo'shimcha izoh">
          <TextArea rows={3} value={form.notes} onChange={set('notes')} placeholder="Qo'shimcha talablar..." />
        </Field>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-ink px-6 py-3 rounded-sm font-medium hover:bg-goldbright transition-colors disabled:opacity-50"
        >
          {submitting ? 'Yuborilmoqda...' : 'Buyurtma berish'}
        </button>
      </form>
    </div>
  );
}
