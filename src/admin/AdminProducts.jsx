import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../firebase/products.js';
import { Field, TextInput, TextArea, Select } from '../components/FormField.jsx';

const EMPTY = {
  name: '',
  category: 'jalyuzi',
  price: '',
  shortDescription: '',
  imageUrl: '',
  installable: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || '',
      category: p.category || 'jalyuzi',
      price: p.price || '',
      shortDescription: p.shortDescription || '',
      imageUrl: p.imageUrl || '',
      installable: !!p.installable,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: form.price === '' ? null : Number(form.price) };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      cancelEdit();
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Mahsulotni o'chirishga ishonchingiz komilmi?")) return;
    await deleteProduct(id);
    load();
  };

  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="font-display text-3xl text-ivory mb-6">Mahsulotlar</h1>

      <form onSubmit={handleSubmit} className="border border-line rounded-sm p-5 bg-charcoal mb-10 grid sm:grid-cols-2 gap-4">
        <Field label="Nomi">
          <TextInput required value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Kategoriya">
          <Select value={form.category} onChange={set('category')}>
            <option value="jalyuzi">Jalyuzi</option>
            <option value="parda">Parda</option>
            <option value="videokamera">Videokamera</option>
            <option value="lyustra">Lyustra</option>
          </Select>
        </Field>
        <Field label="Narxi (so'm)">
          <TextInput type="number" min="0" value={form.price} onChange={set('price')} />
        </Field>
        <Field label="Rasm URL manzili">
          <TextInput value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Qisqacha tavsif">
            <TextArea rows={2} value={form.shortDescription} onChange={set('shortDescription')} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-ivory/80">
          <input type="checkbox" checked={form.installable} onChange={set('installable')} />
          O'rnatish xizmati mavjud
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-ink px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-goldbright transition-colors disabled:opacity-50"
          >
            {editingId ? 'Saqlash' : "Qo'shish"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="text-sm text-ivory/60 hover:text-ivory">
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-ivory/50">Yuklanmoqda...</p>
      ) : (
        <div className="border border-line rounded-sm divide-y divide-line">
          {products.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-ivory text-sm font-medium">{p.name}</div>
                <div className="text-xs text-ivory/40 capitalize">
                  {p.category} · {p.price ? Number(p.price).toLocaleString('uz-UZ') + " so'm" : "Narx yo'q"}
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(p)} className="text-sm text-gold">Tahrirlash</button>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-400">O'chirish</button>
              </div>
            </div>
          ))}
          {products.length === 0 && <div className="p-6 text-ivory/40 text-sm">Hozircha mahsulot yo'q.</div>}
        </div>
      )}
    </div>
  );
}
