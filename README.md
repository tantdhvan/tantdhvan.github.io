# Trần Đình Tân — Academic Personal Website

Đây là project website cá nhân học thuật dạng tĩnh, phù hợp để đưa lên GitHub Pages.

## Cấu trúc project

```text
.
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── img/avatar.jpg
├── content/
│   ├── profile.md
│   ├── research.md
│   ├── publications.md
│   ├── students.md
│   └── teaching.md
└── materials/
    ├── co-so-lap-trinh/
    ├── ngon-ngu-lap-trinh-c/
    ├── lap-trinh-c-nang-cao/
    ├── cau-truc-du-lieu-va-giai-thuat/
    └── lap-trinh-huong-doi-tuong/
```

## Cách cập nhật nội dung

- Sửa thông tin cá nhân trong `content/profile.md`.
- Sửa hướng nghiên cứu trong `content/research.md`.
- Sửa danh sách công bố trong `content/publications.md`.
- Sửa hướng mở cho sinh viên trong `content/students.md`.
- Sửa môn giảng dạy và link tài liệu trong `content/teaching.md`.
- Thay ảnh cá nhân bằng cách ghi đè file `assets/img/avatar.jpg`.

## Chạy thử trên máy cá nhân

Không nên mở trực tiếp `index.html` bằng trình duyệt vì một số trình duyệt sẽ chặn việc đọc file Markdown cục bộ.

Chạy bằng Python:

```bash
python -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ `tantdhvan.github.io` hoặc `personal-website`.
2. Upload toàn bộ nội dung project này lên repository.
3. Vào **Settings → Pages**.
4. Chọn:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Lưu lại và chờ GitHub Pages build.

Nếu repository tên là `tantdhvan.github.io`, website sẽ có dạng:

```text
https://tantdhvan.github.io
```

Nếu repository tên khác, website sẽ có dạng:

```text
https://tantdhvan.github.io/repository-name/
```

## Ghi chú

Project không phụ thuộc CDN hoặc framework ngoài. Nội dung được quản lý bằng Markdown và được nạp động bằng JavaScript.
