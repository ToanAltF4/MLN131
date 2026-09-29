// Cấu hình 2 slide game. Game do thành viên khác phát triển sau, hiện chỉ hiển thị poster.
// Khi game xong, điền MỘT trong các trường:
//   url      → hiện nút "Vào chơi", mở game ở tab mới (ví dụ link Vercel, Kahoot, Wordwall…)
//   embedUrl → nhúng thẳng game vào slide bằng iframe
//   poster   → ảnh poster riêng, đặt file trong public/images/games/ rồi ghi '/images/games/ten-file.jpg'
export const GAMES = {
  start: {
    kicker: 'Game khởi động',
    title: 'Mảnh ghép tổ ấm',
    tagline: 'Làm nóng trước khi vào bài: bạn hiểu gia đình mình đến đâu?',
    chips: ['Khởi động', '3 – 5 phút', 'Cả lớp cùng chơi'],
    status: 'Đang phát triển',
    url: '',
    embedUrl: '',
    poster: '',
  },
  final: {
    kicker: 'Game tổng kết',
    title: 'Xây nhà hạnh phúc',
    tagline: 'Ôn lại toàn bộ Chương 7: khái niệm, chức năng, cơ sở, biến đổi và phương hướng.',
    chips: ['Tổng kết kiến thức', '5 – 7 phút', 'Có phần thưởng'],
    status: 'Đang phát triển',
    url: '',
    embedUrl: '',
    poster: '',
  },
}
