import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard.jsx';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 bg-facet pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 py-24 md:py-32 relative">
          <div className="text-gold text-sm tracking-[0.25em] uppercase mb-4">Uy uchun premium jihozlash</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl text-ivory">
            Har bir uy — <span className="text-gold">brilliant</span> darajada.
          </h1>
          <p className="mt-6 max-w-xl text-ivory/65 text-lg">
            Jalyuzi, parda, videokuzatuv tizimlari va lyustralarni tanlang —
            o'lchovdan tortib o'rnatishgacha, ustalarimiz o'zi bajaradi.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/katalog/jalyuzi" className="bg-gold text-ink px-6 py-3 rounded-sm font-medium hover:bg-goldbright transition-colors">
              Katalogni ko'rish
            </Link>
            <Link to="/aloqa" className="gold-outline text-gold px-6 py-3 rounded-sm font-medium hover:bg-gold/10 transition-colors">
              Operator bilan bog'lanish
            </Link>
          </div>
        </div>
      </section>

      <div className="facet-divider" />

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="font-display text-3xl text-ivory mb-8">Yo'nalishlar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <CategoryCard
            to="/katalog/jalyuzi"
            icon="▤"
            title="Jalyuzi"
            description="Har qanday o'lcham va rangdagi jalyuzilar, uyga borib o'lchov olamiz."
          />
          <CategoryCard
            to="/katalog/parda"
            icon="▥"
            title="Parda"
            description="Zamonaviy va klassik parda to'plamlari, tikish va osish xizmati bilan."
          />
          <CategoryCard
            to="/katalog/videokamera"
            icon="◎"
            title="Videokamera"
            description="Uy, ofis va do'kon uchun kuzatuv tizimlari — to'liq o'rnatish bilan."
          />
          <CategoryCard
            to="/katalog/lyustra"
            icon="✦"
            title="Lyustra"
            description="Zal, yotoqxona va oshxona uchun lyustralar, yetkazib berish va montaj."
          />
        </div>
      </section>

      {/* Service strip */}
      <section className="border-t border-line bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-gold text-2xl mb-2">01</div>
            <h3 className="font-display text-xl text-ivory mb-1">Tanlaysiz</h3>
            <p className="text-sm text-ivory/60">Katalogdan mahsulot yoki xizmat turini tanlaysiz.</p>
          </div>
          <div>
            <div className="text-gold text-2xl mb-2">02</div>
            <h3 className="font-display text-xl text-ivory mb-1">Buyurtma berasiz</h3>
            <p className="text-sm text-ivory/60">O'lcham, manzil va qulay vaqtni ko'rsatib buyurtma qoldirasiz.</p>
          </div>
          <div>
            <div className="text-gold text-2xl mb-2">03</div>
            <h3 className="font-display text-xl text-ivory mb-1">Biz o'rnatamiz</h3>
            <p className="text-sm text-ivory/60">Ustamiz belgilangan vaqtda kelib, professional o'rnatib beradi.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
