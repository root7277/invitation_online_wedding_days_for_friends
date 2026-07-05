TAKLIFNOMA ONLINE ADMIN PANEL — FOYDALANISH TARTIBI

Bu variant siz aytgan holat uchun: bitta sayt bir marta deploy qilinadi, keyin admin paneldan xohlagancha do'stlar uchun alohida taklifnoma ochasiz. Har biriga alohida link chiqadi:

https://sayt-nomi.netlify.app/diyor-sevinch
https://sayt-nomi.netlify.app/ali-malika
https://sayt-nomi.netlify.app/nurbek-madina

Ma'lumotni admin paneldan o'zgartirsangiz, qayta deploy qilish shart emas. Sayt bazadan o'qiydi va o'zgarish onlaynda ko'rinadi.

1) SUPABASE SOZLASH

1. https://supabase.com saytiga kiring.
2. New project yarating.
3. Chap menyu: SQL Editor > New query.
4. ZIP ichidagi supabase_schema.sql faylini oching, ichidagi kodni SQL Editor ga tashlang va RUN qiling.
5. Authentication > Users bo'limiga kiring.
6. Add user orqali o'zingiz uchun admin email va parol yarating.
7. Project Settings > API bo'limiga kiring.
8. Project URL va anon/public key ni nusxalang.
9. ZIP ichidagi config.js faylini oching va shu ikki joyni to'ldiring:

SUPABASE_URL: "PASTE_SUPABASE_PROJECT_URL_HERE"
SUPABASE_ANON_KEY: "PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE"

Eslatma: service_role keyni config.js ga yozmang. U maxfiy kalit.

2) NETLIFY GA DEPLOY QILISH

1. config.js to'ldirilgandan keyin papkani tayyorlang.
2. https://app.netlify.com/drop sahifasiga kiring.
3. taklifnoma_online_admin papkasini Netlify Drop oynasiga tortib tashlang.
4. Netlify sizga link beradi.
5. Site settings > Domain management bo'limida sayt nomini qisqartirib qo'ying.

Masalan:
https://taklifnoma-admin.netlify.app

3) ADMIN PANELDAN ISHLATISH

Saytingiz deploy bo'lgandan keyin admin panel:

https://sayt-nomi.netlify.app/admin

yoki
https://sayt-nomi.netlify.app/admin.html

Email va parol bilan kirasiz.

4) YANGI DO'ST UCHUN TAKLIFNOMA QILISH

1. Admin panelga kiring.
2. + Yangi tugmasini bosing.
3. Kuyov, kelin, sana, manzil, to'yxona, xarita, matn, musiqa kiriting.
4. Slug yozing. Masalan: ali-malika
5. Saqlash tugmasini bosing.
6. Link chiqadi:
   https://sayt-nomi.netlify.app/ali-malika
7. Shu linkni yaqinlaringizga yuborasiz.

5) OLDINGI TAKLIFNOMANI NUSXA QILISH

1. Chapdan oldingi taklifnomani tanlang.
2. Nusxa olib yangi qilish tugmasini bosing.
3. Slugni o'zgartiring.
4. Ismlar va ma'lumotlarni almashtiring.
5. Saqlash tugmasini bosing.

6) MUSIQA VA RASM YUKLASH

Admin panel > Media bo'limida:
- musiqa tanlang va "Musiqani yuklash" tugmasini bosing;
- rasm tanlang va "Rasm URL olish" tugmasini bosing;
- keyin albatta "Saqlash" tugmasini bosing.

7) MEHMONLAR JAVOBINI KO'RISH

Admin panel > Javoblar bo'limiga o'ting.
"Javoblarni yuklash" tugmasini bosing.
Kelaman/kela olmayman javoblari bazadan ko'rinadi.

MUHIM

- Saytni bir marta deploy qilasiz.
- Keyingi ma'lumotlar admin paneldan o'zgaradi.
- Har safar qayta deploy qilish kerak emas.
- Har bir do'st uchun alohida sayt ochish kerak emas.
- Bitta sayt ichida xohlagancha taklifnoma ishlaydi.
