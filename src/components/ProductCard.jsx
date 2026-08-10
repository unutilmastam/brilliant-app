import React from 'react';
import { Link } from 'react-router-dom';

function formatSum(n) {
  if (n === undefined || n === null || n === '') return "Narxi so'ralsin";
  return Number(n).toLocaleString('uz-UZ') + " so'm";
}

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/mahsulot/${product.id}`}
      className="group rounded-sm overflow-hidden border border-line bg-charcoal hover:border-gold transition-colors flex flex-col"
    >
      <div className="aspect-[4/3] bg-ink overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ivory/20 text-4xl">◆</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-display text-xl text-ivory leading-tight">{product.name}</h3>
        {product.shortDescription && (
          <p className="text-xs text-ivory/55 line-clamp-2">{product.shortDescription}</p>
        )}
        <div className="mt-2 text-gold font-medium">{formatSum(product.price)}</div>
      </div>
    </Link>
  );
}
