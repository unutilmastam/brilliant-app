import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config.js';

const ordersRef = collection(db, 'orders');

// Buyurtma holatlari — admin panelda pipeline sifatida ko'rsatiladi
export const ORDER_STATUSES = [
  'yangi',            // Yangi buyurtma
  'qabul_qilindi',    // Qabul qilindi
  'usta_biriktirildi',// Usta biriktirildi
  'yolda',            // Yo'lda
  'ornatilmoqda',     // O'rnatilmoqda
  'yakunlandi',       // Yakunlandi
  'bekor_qilindi',    // Bekor qilindi
];

export const STATUS_LABELS = {
  yangi: 'Yangi buyurtma',
  qabul_qilindi: 'Qabul qilindi',
  usta_biriktirildi: 'Usta biriktirildi',
  yolda: "Yo'lda",
  ornatilmoqda: "O'rnatilmoqda",
  yakunlandi: 'Yakunlandi',
  bekor_qilindi: 'Bekor qilindi',
};

// type: 'jalyuzi_parda' | 'videokamera' | 'lyustra' | 'mahsulot'
export async function createOrder(data) {
  return addDoc(ordersRef, {
    ...data,
    status: 'yangi',
    createdAt: Date.now(),
  });
}

export async function getAllOrders() {
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getOrder(id) {
  const snap = await getDoc(doc(db, 'orders', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function updateOrderStatus(id, status) {
  return updateDoc(doc(db, 'orders', id), { status });
}

export async function assignMaster(id, masterName) {
  return updateDoc(doc(db, 'orders', id), {
    masterName,
    status: 'usta_biriktirildi',
  });
}
