// Cấu hình slide game khởi động (slide 2): nút "Vào chơi" mở trang /game (src/game/).
// Game tổng kết là ô chữ chơi trên giấy, poster nằm ở components/CrosswordPoster.jsx.
// Khi game xong, điền MỘT trong các trường:
//   url      → hiện nút "Vào chơi", mở game ở tab mới (ví dụ link Vercel, Kahoot, Wordwall…)
//   embedUrl → nhúng thẳng game vào slide bằng iframe
//   poster   → ảnh poster riêng, đặt file trong public/images/games/ rồi ghi '/images/games/ten-file.jpg'
export const GAMES = {
  start: {
    kicker: 'Game khởi động',
    title: 'Nhà Mình Ổn Không?',
    tagline: 'Cả lớp cùng điều hành một gia đình Việt Nam qua 7 biến cố đời sống.',
    chips: ['7 biến cố', '3 nguồn lực', 'Không có lựa chọn hoàn hảo'],
    status: '',
    slot: 'Mô phỏng quyết sách gia đình',
    url: '/game',
    embedUrl: '',
    poster: '',
  },
}
