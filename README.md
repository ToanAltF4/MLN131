# Xây dựng gia đình Việt Nam trong thời kỳ quá độ lên CNXH

Website trình chiếu của **Nhóm 6 · MLN131 · Lớp Half1_SE1821 · GV DuyNK32**.
Công nghệ: Vite, React, Three.js (React Three Fiber) và Motion. Chỉ có frontend, không cần backend.

## Chạy
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # xuất ra dist/ (deploy Vercel/Netlify/GitHub Pages)
npm run preview    # xem bản build
```
Font và hiệu ứng 3D được đóng gói sẵn, nên khi trình chiếu trên lớp **không cần internet** (trừ khi game gắn link ngoài).

## Điều khiển
`→` / `Space` sang slide tiếp · `←` quay lại · `G` xem tổng quan · `F` toàn màn hình · con lăn chuột · vuốt trên điện thoại.
Mỗi slide có URL riêng (`/#25` là slide Công thức 5T). Góc phải trên luôn hiện **người đang trình bày**.

## Phân công (mỗi người ≤ 3 phút)
| Người | Phần | Slide | Giáo trình |
|---|---|---|---|
| Tiến | Mở đầu, I. Gia đình là gì? | 1, 3 – 7 | tr. 239 – 245 |
| Hoài Anh | II. Chức năng & 4 cơ sở xây dựng gia đình | 8 – 11 | tr. 245 – 257 |
| Duy | III. Biến đổi: quy mô, sinh đẻ, kinh tế | 12 – 15 | tr. 257 – 261 |
| Phước | IV. Biến đổi: giáo dục, tình cảm, các mối quan hệ | 16 – 19 | tr. 261 – 265 |
| Quân | V. Vấn đề đặt ra & phương hướng | 20 – 23 | tr. 263 – 269 |
| Toàn | VI. Công thức 5T của sinh viên & Kết luận | 24 – 28 | tr. 257 – 258, 266 – 269 |
| Cả nhóm | Game khởi động (slide 2), Game tổng kết (slide 29) | | |

Chi tiết số trang, nhận xét nội dung và câu hỏi vấn đáp: [`docs/GIAO-TRINH-CHUONG-7.md`](docs/GIAO-TRINH-CHUONG-7.md).

## Gắn game (dành cho bạn phát triển game)
Hai slide game hiện chỉ có poster. Mở `src/data/games.js`, ở `start` (slide 2) hoặc `final` (slide cuối), điền **một** trong các trường:
- `url`: link game, slide hiện nút “Vào chơi” mở ở tab mới.
- `embedUrl`: nhúng game thẳng vào khung poster bằng iframe.
- `poster`: ảnh poster riêng, đặt file vào `public/images/games/` rồi ghi `'/images/games/ten-file.jpg'`.

Có thể đổi luôn `title`, `tagline`, `chips` cho khớp game thật.

## Cấu trúc
| File | Nội dung |
|---|---|
| `src/data/slides.jsx` | Toàn bộ slide và các phần (sửa nội dung ở đây) |
| `src/data/meta.js` | Môn, lớp, giảng viên, thành viên, AI Usage |
| `src/data/games.js` | Cấu hình 2 slide game |
| `src/data/webImages.json` | Ảnh báo chí kèm nguồn (chú thích, tên báo, link bài) |
| `src/components/` | Deck (trình chiếu), Pager (phân trang), Scene3D (ngôi nhà 3D), GamePoster, ui |
| `docs/GIAO-TRINH-CHUONG-7.md` | Đối chiếu giáo trình Chương 7, tr. 239 – 269 |

## Nguồn & AI
- Mọi hình ảnh là **ảnh báo chí có màu, có nguồn** từ báo chính trị – xã hội lớn của Việt Nam. Không dùng ảnh AI, không lấy Wikipedia. Danh sách đầy đủ ở slide “Tài liệu tham khảo & nguồn ảnh”.
- AI Usage: nhóm **chỉ sử dụng Claude (Anthropic)**.
