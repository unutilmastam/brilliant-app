# BRILIANT — savdo va o'rnatish xizmati ilovasi

Jalyuzi, parda, videokamera va lyustra sotadigan hamda ularni mijoz uyiga borib
o'rnatib beradigan **BRILIANT** magazini uchun veb-ilova.

- Mijozlar uchun: katalog, mahsulot sahifasi, 3 xil maxsus buyurtma formasi
  (jalyuzi/parda o'lchovi, videokamera o'rnatish, lyustra yetkazib berish),
  buyurtmani telefon raqami orqali kuzatish.
- Admin panel uchun: mahsulotlarni qo'shish/tahrirlash/o'chirish, buyurtmalar
  ro'yxati va status pipeline (Yangi → Qabul qilindi → Usta biriktirildi →
  Yo'lda → O'rnatilmoqda → Yakunlandi).

Texnologiyalar: **React + Vite + React Router + Tailwind CSS + Firebase**
(Firestore, Authentication, Storage).

---

## 1. Loyihani mahalliy kompyuterda ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:5173` ochiladi.

## 2. Firebase loyihasini sozlash

1. [console.firebase.google.com](https://console.firebase.google.com) da yangi
   loyiha yarating (masalan, `brilliant-shop`).
2. **Build → Firestore Database** bo'limida bazani yarating (production mode).
3. **Build → Authentication → Sign-in method** da **Email/Password** ni
   yoqing, so'ng **Users** bo'limida o'zingiz uchun admin hisob yarating
   (email + parol) — shu hisob bilan `/admin/login` ga kirasiz.
4. (Ixtiyoriy) **Build → Storage** ni yoqing — mahsulot rasmlarini u yerga
   yuklab, olingan URL manzilini admin panelda "Rasm URL manzili" maydoniga
   qo'yasiz. Yoki boshlash uchun istalgan tashqi rasm URL manzilidan
   foydalanishingiz mumkin.
5. **Project settings → General → Your apps** bo'limida "Web app" qo'shing va
   berilgan konfiguratsiya qiymatlarini oling.
6. Loyiha ildizida `.env.local` fayl yarating (`.env.example` dan nusxa oling)
   va qiymatlarni joylashtiring:

```bash
cp .env.example .env.local
```

7. `firestore.rules` faylidagi qoidalarni Firebase Console →
   **Firestore Database → Rules** bo'limiga joylashtiring va nashr eting
   (Publish).

## 3. Ma'lumotlar tuzilishi (Firestore)

**`products`** to'plami:

| Maydon            | Turi     | Izoh                                              |
|--------------------|----------|----------------------------------------------------|
| name               | string   | Mahsulot nomi                                       |
| category           | string   | `jalyuzi` \| `parda` \| `videokamera` \| `lyustra`  |
| price              | number   | Narxi (so'm)                                        |
| shortDescription   | string   | Qisqacha tavsif                                     |
| imageUrl           | string   | Rasm manzili                                         |
| installable        | boolean  | O'rnatish xizmati mavjudligi                         |
| createdAt          | number   | Avtomatik qo'shiladi                                 |

**`orders`** to'plami (barcha buyurtma turlari uchun umumiy, `type` maydoni
bilan farqlanadi: `jalyuzi_parda`, `videokamera`, `lyustra`):

| Maydon      | Izoh                                                        |
|-------------|--------------------------------------------------------------|
| type        | Buyurtma turi                                                 |
| status      | `yangi`, `qabul_qilindi`, `usta_biriktirildi`, `yolda`, `ornatilmoqda`, `yakunlandi`, `bekor_qilindi` |
| phone       | Mijoz telefon raqami (kuzatish shu bo'yicha ishlaydi)         |
| address     | Manzil                                                        |
| masterName  | Biriktirilgan usta ismi                                       |
| createdAt   | Avtomatik qo'shiladi                                           |

Har bir buyurtma turida qo'shimcha maxsus maydonlar bor (masalan, `width`,
`height`, `roomType` — jalyuzi/parda uchun; `cameraCount`, `placement` —
videokamera uchun). To'liq ro'yxat uchun `src/pages/*Order.jsx` fayllariga
qarang.

## 4. Loyiha tuzilishi

```
src/
  firebase/       Firebase config va Firestore so'rovlari (products, orders)
  context/        AuthContext — admin login holati
  components/     Header, Footer, ProductCard, StatusBadge, forma elementlari
  pages/          Mijozlar uchun sahifalar (Home, Catalog, buyurtma formalar...)
  admin/          Admin panel sahifalari (Login, Dashboard, Products, Orders)
  App.jsx         Barcha route'lar shu yerda belgilangan
```

## 5. GitHub'ga joylashtirish

```bash
git init
git add .
git commit -m "BRILIANT ilovasi — birinchi versiya"
git branch -M main
git remote add origin <sizning-repo-manzilingiz>
git push -u origin main
```

`.env.local` fayli `.gitignore` da bo'lgani uchun GitHub'ga yuklanmaydi —
bu to'g'ri, chunki u maxfiy kalitlarni saqlaydi. Deploy qilishda (Vercel,
Netlify, Firebase Hosting) shu muhit o'zgaruvchilarini hosting sozlamalarida
qo'lda kiritishingiz kerak bo'ladi.

## 6. Ishlab chiqarish (production) build

```bash
npm run build
```

Natija `dist/` papkasida hosil bo'ladi — uni Firebase Hosting, Vercel yoki
Netlify'ga yuklashingiz mumkin.

### Firebase Hosting orqali deploy qilish (tavsiya etiladi)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # "dist" papkasini public directory sifatida ko'rsating
npm run build
firebase deploy
```

---

## Keyingi qadamlar (ixtiyoriy kengaytmalar)

- Rasm yuklashni to'g'ridan-to'g'ri admin paneldan (Firebase Storage bilan)
  qo'shish — hozircha URL orqali kiritiladi.
- SMS/Telegram bot orqali mijozga status o'zgarganda avtomatik xabar yuborish
  (Cloud Functions).
- Bir nechta admin/usta roli (masalan, usta faqat o'ziga biriktirilgan
  buyurtmalarni ko'rsin).
