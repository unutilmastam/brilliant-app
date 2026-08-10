import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display text-4xl text-ivory mb-6">Aloqa</h1>
      <div className="border border-line rounded-sm divide-y divide-line bg-charcoal">
        <div className="p-5 flex justify-between">
          <span className="text-ivory/55">Telefon</span>
          <a href="tel:+998900000000" className="text-gold">+998 90 000 00 00</a>
        </div>
        <div className="p-5 flex justify-between">
          <span className="text-ivory/55">Telegram / WhatsApp</span>
          <span className="text-gold">@BRILIANT_shop</span>
        </div>
        <div className="p-5 flex justify-between">
          <span className="text-ivory/55">Ish vaqti</span>
          <span className="text-ivory">Har kuni 09:00 – 19:00</span>
        </div>
        <div className="p-5 flex justify-between">
          <span className="text-ivory/55">Manzil</span>
          <span className="text-ivory">Toshkent shahri</span>
        </div>
      </div>
      <p className="text-ivory/50 text-sm mt-6">
        Aniq buyurtma berish uchun katalogdagi tegishli bo'limdan "Buyurtma berish" tugmasini bosing —
        operatorimiz siz bilan tezroq bog'lanadi.
      </p>
    </div>
  );
}
