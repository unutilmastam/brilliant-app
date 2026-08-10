import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-24 text-center">
      <div className="text-gold text-4xl mb-4">◆</div>
      <h1 className="font-display text-3xl text-ivory mb-3">Sahifa topilmadi</h1>
      <Link to="/" className="text-gold">Bosh sahifaga qaytish</Link>
    </div>
  );
}
