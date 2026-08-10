import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../firebase/orders.js';
import { Field, TextInput, TextArea, Select } from '../components/FormField.jsx';

export default function CameraOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: location.state?.productName || '',
    objectType: 'uy',
    cameraCount: 2,
    placement: 'ichki',
    hasInternet: 'ha',
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
      await createOrder({ type: 'videokamera', ...form, cameraCount: Number(form.cameraCount) });
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
        <p className="text-ivory/60 mb-8">Operatorimiz tez orada bog'lanib, o'rnatish vaqtini kelishadi.</p>
        <button onClick={() => navigate('/')} className="bg-gold text-ink px-6 py-3 rounded-sm font-medium">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="font-display text-4xl text-ivory mb-2">Videokamera o'rnatish</h1>
      <p className="text-ivory/55 mb-8">Uy, do'kon yoki ofisingiz uchun kuzatuv tizimi o'rnatamiz.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Obyekt turi">
          <Select value={form.objectType} onChange={set('objectType')}>
            <option value="uy">Uy</option>
            <option value="dokon">Do'kon</option>
            <option value="ofis">Ofis</option>
            <option value="boshqa">Boshqa</option>
          </Select>
        </Field>

        <Field label="Nechta kamera kerak">
          <TextInput type="number" min="1" value={form.cameraCount} onChange={set('cameraCount')} />
        </Field>

        <Field label="Joylashuvi">
          <Select value={form.placement} onChange={set('placement')}>
            <option value="ichki">Faqat ichki</option>
            <option value="tashqi">Faqat tashqi</option>
            <option value="aralash">Ichki + tashqi</option>
          </Select>
        </Field>

        <Field label="Internet mavjudmi">
          <Select value={form.hasInternet} onChange={set('hasInternet')}>
            <option value="ha">Ha</option>
            <option value="yoq">Yo'q</option>
            <option value="bilmayman">Bilmayman</option>
          </Select>
        </Field>

        <Field label="Manzil">
          <TextInput required value={form.address} onChange={set('address')} placeholder="Shahar, tuman, ko'cha, uy" />
        </Field>

        <Field label="Telefon raqami">
          <TextInput required value={form.phone} onChange={set('phone')} placeholder="+998 90 000 00 00" />
        </Field>

        <Field label="Qo'shimcha izoh">
          <TextArea rows={3} value={form.notes} onChange={set('notes')} placeholder="Masalan: hovli, garaj, ombor..." />
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
