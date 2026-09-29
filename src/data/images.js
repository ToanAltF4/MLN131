// Ảnh báo chí chính thống kèm nguồn (manifest: src/data/webImages.json).
// Nạp mềm để web vẫn chạy khi manifest chưa có.
const jsonFiles = import.meta.glob('./webImages.json', { eager: true, import: 'default' })
export const WEB_IMAGES = (jsonFiles['./webImages.json'] ?? []).map((i) => ({
  ...i,
  file: i.file.startsWith('/') ? i.file : `/${i.file}`,
}))

// Lấy ảnh thứ n của một chủ đề; nếu chủ đề không có ảnh thì thử lần lượt các chủ đề dự phòng
export function img(topic, n = 0, ...fallbacks) {
  for (const t of [topic, ...fallbacks]) {
    const list = WEB_IMAGES.filter((i) => i.topic === t)
    if (list.length) return list[Math.min(n, list.length - 1)]
  }
  return undefined
}

export const byFile = (name) => (name ? WEB_IMAGES.find((i) => i.file.endsWith(`/${name}`)) : undefined)
