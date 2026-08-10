import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ to, title, description, icon }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-sm border border-line bg-charcoal p-7 flex flex-col gap-3 hover:border-gold transition-colors"
    >
      <span className="text-gold text-3xl">{icon}</span>
      <h3 className="font-display text-2xl text-ivory">{title}</h3>
      <p className="text-sm text-ivory/60">{description}</p>
      <span className="mt-2 text-sm text-gold group-hover:translate-x-1 transition-transform inline-block w-max">
        Ko'rish →
      </span>
    </Link>
  );
}
