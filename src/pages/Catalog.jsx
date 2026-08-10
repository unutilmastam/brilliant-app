import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../firebase/products.js';
import ProductCard from '../components/ProductCard.jsx';

const TITLES = {
  jalyuzi: 'Jalyuzi',
  parda: 'Parda',
  videokamera: 'Videokamera',
  lyustra: 'Lyustra',
};

const CUSTOM_ORDER_LINK = {
  jalyuzi: '/buyurtma/jalyuzi-parda',
  parda: '/buyurtma/jalyuzi-parda',
  videokamera: '/buyurtma/videokamera',
  lyustra: '/buyurtma/lyustra',
};

export default function Catalog() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductsByCategory(category)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  const title = TITLES[category] || category;

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-4xl text-ivory">{title}</h1>
        <Link
          to={CUSTOM_ORDER_LINK[category] || '/aloqa'}
          className="bg-gold text-ink px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-goldbright transition-colors"
        >
          O'lchov / o'rnatish uchun buyurtma qoldirish →
        </Link>
      </div>

      {loading && <p className="text-ivory/50">Yuklanmoqda...</p>}
      {error && (
        <p className="text-red-400 text-sm">
          Ma'lumotlarni yuklab bo'lmadi. Firebase sozlamalari to'g'ri kiritilganini tekshiring. ({error})
        </p>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="border border-line rounded-sm p-10 text-center text-ivory/50">
          Hozircha bu bo'limda mahsulot yo'q. Admin panelda qo'shishingiz mumkin.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
