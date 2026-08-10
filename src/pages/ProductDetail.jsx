import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../firebase/products.js';

function formatSum(n) {
  if (n === undefined || n === null || n === '') return "Narxi so'ralsin";
  return Number(n).toLocaleString('uz-UZ') + " so'm";
}

const ORDER_LINK_BY_CATEGORY = {
  jalyuzi: '/buyurtma/jalyuzi-parda',
  parda: '/buyurtma/jalyuzi-parda',
  videokamera: '/buyurtma/videokamera',
  lyustra: '/buyurtma/lyustra',
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="max-w-6xl mx-auto px-5 py-16 text-ivory/50">Yuklanmoqda...</div>;
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-16 text-ivory/60">
        Mahsulot topilmadi. <Link to="/" className="text-gold">Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-10">
      <div className="aspect-[4/3] bg-charcoal border border-line rounded-sm overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ivory/20 text-6xl">◆</div>
        )}
      </div>

      <div>
        <h1 className="font-display text-4xl text-ivory mb-2">{product.name}</h1>
        <div className="text-gold text-2xl font-medium mb-6">{formatSum(product.price)}</div>

        {product.shortDescription && <p className="text-ivory/70 mb-6">{product.shortDescription}</p>}

        {product.specs && (
          <div className="border border-line rounded-sm divide-y divide-line mb-8">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                <span className="text-ivory/50">{k}</span>
                <span className="text-ivory">{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            to={ORDER_LINK_BY_CATEGORY[product.category] || '/aloqa'}
            state={{ productName: product.name }}
            className="bg-gold text-ink px-6 py-3 rounded-sm font-medium hover:bg-goldbright transition-colors"
          >
            Buyurtma berish
          </Link>
          <Link to="/aloqa" className="gold-outline text-gold px-6 py-3 rounded-sm font-medium hover:bg-gold/10 transition-colors">
            Savol berish
          </Link>
        </div>

        {product.installable && (
          <p className="mt-6 text-xs text-ivory/40">✓ Ushbu mahsulot uchun o'rnatish xizmati mavjud</p>
        )}
      </div>
    </div>
  );
}
