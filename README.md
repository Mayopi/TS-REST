# TypeScript REST API

Ini adalah Project Based Learning dari Typescript berupa REST API

Project Based Learning _Typescript_ REST api adalah sebuah proyek belajar pemrograman dengan menggunakan bahasa _Typescript_ yang fokus pada pembuatan RESTful API. Pada proyek ini, Anda akan mempelajari cara mengembangkan aplikasi web dengan menggunakan _Node.js_ dan _Express.js_, serta menggunakan database _MongoDB_ sebagai penyimpan data.

---

## Getting Started

Instruksi ini akan memberi Anda salinan proyek dan berjalan di mesin lokal Anda untuk tujuan pengembangan dan pengujian.

## Prerequisites

Node.js v14.15.0 or later
NPM v6.14.8 or later
MongoDB v4.4.5 or later

### Installation

Clone the repository:

```bash
git clone https://github.com/mayopi/TS-REST.git
```

Install dependencies:

```bash
cd TS-REST npm install
```

_PENTING!_: Buat file .env di direktori root proyek dengan konfigurasi berikut:

```bash
MONGO_URL=mongodb://{username}:{password}@{host}:{port}/{database}
PORT=3000
SECRET_ACCESS_TOKEN={random-string}
```

Ganti {username}, {password}, ​​{host}, {port}, {database}, dan {random-string} dengan konfigurasi Anda sendiri.

### Running

Untuk memulai server pengembangan, jalankan:

`npm run dev`

Server akan mendengarkan pada port 3000 secara default.

### API Endpoints

- Otentikasi Pengguna
- Daftarkan Pengguna
  - POST /api/auth/register

Mendaftarkan Pengguna baru.

| Parameter | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| email     | String | Yes      | User Email Address |
| username  | String | Yes      | User Name          |
| password  | String | Yes      | User Password      |

- Login Pengguna
  - POST /api/auth/login

Log in menggunakan Pengguna.

| Parameter | Type   | Required | Description           |
| --------- | ------ | -------- | --------------------- |
| email     | String | Yes      | User's email address. |
| password  | String | Yes      | User's password.      |

- Logout Pengguna
  - POST /api/auth/logout

Log out Pengguna saat ini.

- Managemen Pengguna
  - Get All Users
    - GET /api/users

Mengembalikan daftar semua pengguna.

- Dapatkan Pengguna berdasarkan Email
  - GET /api/users/:email

Mengembalikan satu pengguna dengan Email yang ditentukan.

### Built With

- Express - Web framework for Node.js
- Mongoose - Object data modeling library for MongoDB
- TypeScript - Typed superset of JavaScript

### Authors

[Mayopi](https://github.com/mayopi) - Initial work
