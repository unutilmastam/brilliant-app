import React from 'react';
import { STATUS_LABELS } from '../firebase/orders.js';

const COLORS = {
  yangi: 'bg-ivory/10 text-ivory',
  qabul_qilindi: 'bg-gold/15 text-gold',
  usta_biriktirildi: 'bg-gold/15 text-gold',
  yolda: 'bg-gold/25 text-goldbright',
  ornatilmoqda: 'bg-gold/25 text-goldbright',
  yakunlandi: 'bg-green-500/15 text-green-400',
  bekor_qilindi: 'bg-red-500/15 text-red-400',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-sm text-xs font-medium ${COLORS[status] || 'bg-ivory/10 text-ivory'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
