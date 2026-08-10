import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './config.js';

const productsRef = collection(db, 'products');

// category: 'jalyuzi' | 'parda' | 'videokamera' | 'lyustra'
export async function getProductsByCategory(category) {
  const q = query(productsRef, where('category', '==', category), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAllProducts() {
  const q = query(productsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProduct(id) {
  const snap = await getDoc(doc(db, 'products', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createProduct(data) {
  return addDoc(productsRef, { ...data, createdAt: Date.now() });
}

export async function updateProduct(id, data) {
  return updateDoc(doc(db, 'products', id), data);
}

export async function deleteProduct(id) {
  return deleteDoc(doc(db, 'products', id));
}
