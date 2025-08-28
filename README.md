# 🚀 Laravel 12 + React + Tailwind Starter

Project ini dibuat dengan **Laravel 12** menggunakan **Breeze (React + Tailwind)** sebagai starter kit.  
Sudah terdapat fitur **Authentication (Login, Register, Forgot Password, Logout)** dan siap untuk dikembangkan lebih lanjut.

---

## 📌 Persyaratan
Sebelum mulai, pastikan sudah terinstall di komputer kamu:

- [PHP >= 8.2](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js >= 18 + NPM](https://nodejs.org/)
- [MySQL/MariaDB](https://www.mysql.com/) atau database lain yang didukung Laravel
- [Git](https://git-scm.com/)
- **(Opsional)** [Laragon](https://laragon.org/) (Windows) atau [Docker](https://www.docker.com/)

---

## ⚡ Instalasi Project

### 1. Clone Repository
```bash
git clone https://github.com/username/nama-project.git
cd nama-project
```

### 2. Install Dependency Laravel
```bash
composer install
```

### 3. Install Dependency Frontend
```bash
npm install
```

### 4. Setup Environment
Salin file `.env.example` menjadi `.env`
```bash
cp .env.example .env
```

Atur konfigurasi database di `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate App Key
```bash
php artisan key:generate
```

### 6. Install Breeze (React + Tailwind)
```bash
composer require laravel/breeze --dev
php artisan breeze:install react
npm install && npm run dev
```

### 7. Migrasi Database
```bash
php artisan migrate
```

---

## ▶️ Menjalankan Project

### Jalankan server Laravel
```bash
php artisan serve
```

### Jalankan Vite (Frontend Dev Server)
```bash
npm run dev
```

Akses aplikasi di:  
👉 `http://127.0.0.1:8000`

---

## 📂 Struktur Project

```bash
resources/js/
 ├─ Components/   # Komponen kecil (Button, Navbar, dll)
 ├─ Pages/        # Halaman utama (Dashboard.jsx, Login.jsx, dll)
 ├─ app.jsx       # Root React App
 └─ bootstrap.js  # Bootstrap script

routes/web.php   # Definisi route Laravel
.env             # Konfigurasi environment
```

---

## 🎨 Cara Ngoding React
- Buat **komponen kecil** di `resources/js/Components/`
- Buat **halaman** di `resources/js/Pages/`
- Tambahkan **route** di `routes/web.php` menggunakan `Inertia::render()`
- Gunakan **Tailwind CSS** langsung di className untuk styling

Contoh route di Laravel:
```php
Route::get('/notes', function () {
    return Inertia::render('Notes/Index');
});
```

Contoh halaman React:
```jsx
export default function Index() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">📒 My Notes</h1>
      <p className="mt-2 text-gray-600">Ini halaman catatan kamu.</p>
    </div>
  );
}
```

---

## ✅ Checklist Setup Cepat
1. `composer install`
2. `npm install`
3. Copy `.env` & setting database
4. `php artisan key:generate`
5. `composer require laravel/breeze --dev`
6. `php artisan breeze:install react`
7. `npm install && npm run dev`
8. `php artisan migrate`
9. `php artisan serve`

---

## 👥 Kontributor
- **Nama Kamu** (Developer)
- **Teman Kamu** (Collaborator)

---

## 📄 Lisensi
Project ini menggunakan lisensi [MIT](https://opensource.org/licenses/MIT).
