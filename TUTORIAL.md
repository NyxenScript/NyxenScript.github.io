> **Untuk akun NyxenScript:** buat repository bernama `NyxenScript.github.io`. Hasilnya website langsung di `https://nyxenscript.github.io/`. Alamat repository sudah terisi di `config.mts`, dan base path diatur otomatis oleh workflow, jadi Bagian C dan catatan `base` di Bagian E tidak perlu diubah.

# Tutorial dari nol: website dokumentasi script FiveM di GitHub

Tutorial ini untuk pemula. Hasil akhirnya: satu website dokumentasi gratis di GitHub Pages yang berisi nyx_lib dan script lain yang kamu buat. Perkiraan waktu: 20-30 menit.

---

## Bagian A. Install alat yang dibutuhkan (sekali saja)

1. **Node.js** (versi LTS): unduh di <https://nodejs.org> lalu install. Cek di terminal/CMD:
   ```bash
   node -v
   npm -v
   ```
   Keduanya harus menampilkan angka versi (Node 20 atau lebih baru).
2. **Git**: unduh di <https://git-scm.com> lalu install (klik Next terus tidak masalah). Cek:
   ```bash
   git --version
   ```
3. **Akun GitHub**: daftar gratis di <https://github.com>.
4. (Opsional tapi disarankan) **VS Code** dari <https://code.visualstudio.com> untuk mengedit file.

Beri tahu Git siapa kamu (sekali saja, ganti dengan datamu):

```bash
git config --global user.name "NamaKamu"
git config --global user.email "emailgithubmu@example.com"
```

---

## Bagian B. Jalankan website di komputer sendiri

1. Ekstrak `nyx_lib-docs.zip`, sehingga ada folder `nyx_lib-docs`.
2. Buka terminal **di dalam folder itu**. Di Windows: buka foldernya, klik kolom alamat, ketik `cmd`, tekan Enter.
3. Jalankan:
   ```bash
   npm install
   npm run dev
   ```
4. Buka <http://localhost:5173> di browser. Website sudah tampil. Tekan `Ctrl + C` di terminal untuk berhenti.

Setiap kamu menyimpan perubahan pada file `.md`, tampilan di browser ikut berubah otomatis.

---

## Bagian C. Atur alamat repository

Buka `docs/.vitepress/config.mts`, cari baris ini di bagian atas:

```ts
const REPO = 'https://github.com/YOUR-NAME/nyx_lib-docs'
```

Ganti `YOUR-NAME` dengan username GitHub kamu, dan `nyx_lib-docs` dengan nama repository yang akan kamu buat di Bagian D.

---

## Bagian D. Buat repository dan upload (push)

### D1. Buat repository kosong
1. Di GitHub, klik tanda **+** di kanan atas, lalu **New repository**.
2. Isi **Repository name**, misalnya `nyx_lib-docs`.
3. Pilih **Public**. GitHub Pages gratis butuh repository publik.
4. **Jangan** centang "Add a README", "Add .gitignore" atau license.
5. Klik **Create repository**.

### D2. Upload dari komputer
Di terminal **dalam folder `nyx_lib-docs`** jalankan satu per satu (ganti `YOUR-NAME` dan nama repo):

```bash
git init
git add .
git commit -m "Add docs"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/nyx_lib-docs.git
git push -u origin main
```

Saat diminta login:
- **Username**: username GitHub kamu.
- **Password**: pakai **Personal Access Token**, bukan password biasa. Cara membuatnya: GitHub → foto profil → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**. Centang `repo`, buat, lalu salin tokennya (hanya tampil sekali).

Alternatif tanpa terminal: pakai **GitHub Desktop** (<https://desktop.github.com>), lalu pilih *Add local repository* → *Publish repository*.

### D3. Cek
Refresh halaman repository di GitHub. File-filenya harus sudah muncul.

---

## Bagian E. Aktifkan website (GitHub Pages)

1. Di repository, buka **Settings** → **Pages**.
2. Pada **Build and deployment → Source** pilih **GitHub Actions**.
3. Buka tab **Actions**. Tunggu proses "Deploy docs to GitHub Pages" sampai ada tanda centang hijau (1-2 menit). Kalau belum jalan, klik workflow itu lalu **Run workflow**.
4. Alamat website kamu: `https://YOUR-NAME.github.io/nyx_lib-docs/`

Jika repository kamu bernama `YOUR-NAME.github.io`, alamatnya langsung `https://YOUR-NAME.github.io/`. Dalam kasus itu, di `config.mts` ubah `base: process.env.DOCS_BASE || '/'` agar selalu `'/'`, dan di file `.github/workflows/deploy.yml` hapus baris `DOCS_BASE`.

---

## Bagian F. Mengubah isi dokumentasi nanti

1. Edit file `.md` di folder `docs/`.
2. Cek di browser lewat `npm run dev`.
3. Kirim ke GitHub:
   ```bash
   git add .
   git commit -m "Update docs"
   git push
   ```
4. Tunggu 1-2 menit, website otomatis diperbarui.

---

## Bagian G. Menambah script baru (inti dari struktur ini)

Satu folder di `docs/` = satu script. Contoh sekarang: `docs/nyx_lib/`.

1. Buat kerangka script baru (ganti `nama_script` dengan nama resource kamu):
   ```bash
   npm run new-script -- nama_script
   ```
   Ini membuat folder `docs/nama_script/` berisi contoh halaman dan file `script.json`.
2. Buka `docs/nama_script/script.json`:
   - `title`: nama yang tampil di menu dan kartu halaman depan.
   - `tagline`: satu kalimat penjelasan di kartu halaman depan.
   - `sidebar`: daftar menu kiri. Setiap `link` mengarah ke file `.md` di dalam folder script tanpa `.md`. Contoh: `"/guide/installation"` berarti file `docs/nama_script/guide/installation.md`.
3. Tulis halamannya sebagai file `.md`. Untuk halaman baru, buat file lalu tambahkan juga ke `sidebar` di `script.json`.
4. Link antar halaman harus memuat nama folder script, misalnya `[Instalasi](/nama_script/guide/installation)`.
5. Cek dengan `npm run dev`. Kartu script baru muncul otomatis di halaman depan dan di menu **Scripts**.
6. Kirim: `git add .`, `git commit -m "Add nama_script docs"`, `git push`.

### Saran isi halaman untuk tiap script
- Apa itu script ini, fiturnya, dan kebutuhan (framework, resource lain).
- Instalasi langkah demi langkah dan isi `config.lua`.
- Cara pakai (command, exports, events) dengan contoh kode.
- Masalah umum dan solusinya.

---

## Masalah umum

| Gejala | Solusi |
|---|---|
| `npm` / `git` tidak dikenali | Tutup dan buka lagi terminal setelah install. Jika masih gagal, install ulang Node.js / Git. |
| `git push` ditolak / gagal login | Gunakan Personal Access Token sebagai password (Bagian D2). |
| `remote origin already exists` | Jalankan `git remote set-url origin https://github.com/YOUR-NAME/NAMA-REPO.git` lalu push lagi. |
| Website tampil tanpa gaya / halaman 404 | `base` salah. Pastikan lewat workflow GitHub Actions (Bagian E) dan nama repo di URL sama dengan yang dipakai. |
| Workflow gagal dengan tulisan *dead link* | Ada link antar halaman yang file tujuannya tidak ada. Baca log Actions, perbaiki link tersebut. |
| Tab Pages tidak punya opsi GitHub Actions | Repository harus Public (atau akun berbayar). Cek juga di Settings → Pages. |
| Halaman baru tidak ada di menu kiri | Belum didaftarkan di `sidebar` pada `script.json`. |
| Perubahan tidak muncul di website | Tunggu workflow selesai di tab Actions, lalu refresh keras (`Ctrl + F5`). |
