# uni2insigth

<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>

<h1 align="center"><b>ĐỒ ÁN IE204: TỐI ƯU HÓA CÔNG CỤ TÌM KIẾM 
CHO TRANG WEB UNI2INSIGHT
</b></h1>

## Giới thiệu môn

- **Tên môn học:** Tối ưu hóa công cụ tìm kiếm
- **Mã môn học:** IE204
- **Mã lớp:** IE204.Q21.CNVN
- **Năm học:** Học Kì 2 (2025 - 2026)
- **Giảng viên hướng dẫn:** ThS. Trần Vĩnh Khiêm

## Danh sách thành viên nhóm

| STT | MSSV | Họ và Tên | Vai trò | Email |
| :-- | :------- | :---------------- | :---------------- | :--------------------- |
| 1   | 23521621 | Nguyễn Hiền Trân | Nhóm trưởng | <23521621@gm.uit.edu.vn> |
| 2   | 23521459 | Phan Nam Thanh | Thành viên | <23521459@gm.uit.edu.vn> |
| 3   | 23521249 | Trần Thị Như Phương | Thành viên | <23521249@gm.uit.edu.vn> |
| 4   | 23521326 | Nguyễn Ngọc Quyên | Thành viên | <23521326@gm.uit.edu.vn> |
| 5   | 23521416 | Lê Hoàng Thái | Thành viên | <23521416@gm.uit.edu.vn> |

---

## Mô tả dự án

**Uni2Insight** là một nền tảng trực tuyến hỗ trợ học sinh, phụ huynh và sinh viên trong việc **tra cứu điểm chuẩn lịch sử, học phí, và đánh giá chi tiết** của các trường Đại học tại Việt Nam.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## Hướng dẫn cài đặt & chạy ứng dụng

### Yêu cầu hệ thống

*   **Node.js** ≥ 18.x
*   **npm** hoặc **yarn** / **pnpm**

### 1. Clone repository

```bash
git clone https://github.com/thai2602/IE303---Website-Analysis-and-Search-Career.git
cd Website-Analysis-and-Search-Career
```

### 2. Cài đặt các thư viện phụ thuộc

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Chạy ứng dụng dưới local (Development Mode)

```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

### 4. Build dự án (Production Mode)

```bash
npm run build
npm start
```

---

## Cấu trúc thư mục dự án

```text
uni2insight/
├── app/                  # Next.js App Router (Các trang & Route APIs)
│   ├── about/            # Trang giới thiệu
│   ├── api/              # Các API xử lý 
│   ├── blog/             # Trang tin tức, cẩm nang hướng nghiệp
│   ├── contact/          # Trang liên hệ
│   ├── khu-vuc/          # Tra cứu trường đại học theo khu vực địa lý
│   ├── nganh-hoc/        # Tra cứu thông tin theo ngành học
│   ├── review/           # Đánh giá & nhận xét chi tiết các trường đại học
│   ├── search-hub/       # Hub tìm kiếm thông minh
│   ├── so-sanh/          # Tính năng so sánh giữa các trường đại học
│   ├── layout.tsx        # Layout chính của ứng dụng
│   └── page.tsx          # Trang chủ chính
├── components/           # Các component React tái sử dụng
│   ├── Common/           # Các component dùng chung (nút, hộp thoại, accordion...)
│   ├── Header/           # Thanh điều hướng header
│   ├── Footer/           # Footer của trang web
│   ├── HeroSearch/       # Thanh tìm kiếm ở banner chính
│   └── HeroVisual/       # Phần hình ảnh banner trang chủ
├── data/                 # Dữ liệu tĩnh của các trường đại học dưới dạng JSON
├── public/               # Tài nguyên tĩnh (Ảnh, Logo, Favicon)
└── tsconfig.json         # Cấu hình TypeScript cho dự án
```

---

<p align="center">Made with ❤️ by Team Uni2Insight – UIT IE204 2025-2026</p>
