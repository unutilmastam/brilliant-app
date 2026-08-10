import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../firebase/orders.js';
import { Field, TextInput, TextArea, Select } from '../components/FormField.jsx';

export default function BlindsOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: location.state?.productName || '',
    roomType: 'yotoqxona',
    productType: 'jalyuzi',
    width: '',
    height: '',
    material: '',
    color: '',
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
      await createOrder({ type: 'jalyuzi_parda', ...form });
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
        <p className="text-ivory/60 mb-8">
          Tez orada operatorimiz siz bilan bog'lanadi va ustani o'lchov olish uchun yuboradi.
        </p>
        <button onClick={() => navigate('/')} className="bg-gold text-ink px-6 py-3 rounded-sm font-medium">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="font-display text-4xl text-ivory mb-2">Jalyuzi / Parda buyurtmasi</h1>
      <p className="text-ivory/55 mb-8">
        Ma'lumotlarni to'ldiring — ustamiz manzilingizga borib aniq o'lchov oladi va narxni hisoblab beradi.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Mahsulot turi">
          <Select value={form.productType} onChange={set('productType')}>
            <option value="jalyuzi">Jalyuzi</option>
            <option value="parda">Parda</option>
          </Select>
        </Field>

        <Field label="Xona turi">
          <Select value={form.roomType} onChange={set('roomType')}>
            <option value="yotoqxona">Yotoqxona</option>
            <option value="mehmonxona">Mehmonxona</option>
            <option value="oshxona">Oshxona</option>
            <option value="ofis">Ofis</option>
            <option value="boshqa">Boshqa</option>
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Eni (sm)">
            <TextInput type="number" min="0" value={form.width} onChange={set('width')} placeholder="masalan, 150" />
          </Field>
          <Field label="Bo'yi (sm)">
            <TextInput type="number" min="0" value={form.height} onChange={set('height')} placeholder="masalan, 200" />
          </Field>
        </div>
        <p className="text-xs text-ivory/40 -mt-3">
          Aniq bilmasangiz, taxminiy kiriting — usta borib qayta o'lchaydi.
        </p>

        <Field label="Rang / material (agar tanlangan bo'lsa)">
          <TextInput value={form.color} onChange={set('color')} placeholder="masalan, kulrang, blackout parda" />
        </Field>

        <Field label="Manzil">
          <TextInput required value={form.address} onChange={set('address')} placeholder="Shahar, tuman, ko'cha, uy" />
        </Field>

        <Field label="Telefon raqami">
          <TextInput required value={form.phone} onChange={set('phone')} placeholder="+998 90 000 00 00" />
        </Field>

        <Field label="Qo'shimcha izoh" hint="Xona rasmi kerak bo'lsa, operatorga WhatsApp orqali yuborishingiz mumkin">
          <TextArea rows={3} value={form.notes} onChange={set('notes')} placeholder="Qo'shimcha talablar..." />
        </Field>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-ink px-6 py-3 rounded-sm font-medium hover:bg-goldbright transition-colors disabled:opacity-50"
        >
          {submitting ? 'Yuborilmoqda...' : 'Ustani chaqirish'}
        </button>
      </form>
    </div>
  );
}
