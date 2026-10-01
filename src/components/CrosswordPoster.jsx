import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { HeartHandshake, House } from 'lucide-react'

// Poster game ô chữ tổng kết (chơi trên giấy). Lưới chỉ để trang trí: ô trống, cột từ khóa ghi "?", không lộ đáp án.
const TITLE = [['Ô', ' ', 'C', 'H', 'Ữ'], ['T', 'Ổ', ' ', 'Ấ', 'M']]
const KEY_COL = 6
// [ô bắt đầu, số ô] của từng hàng ngang; hàng nào cũng cắt cột từ khóa
const ROWS = [
  [3, 6],
  [5, 5],
  [1, 8],
  [4, 7],
  [2, 6],
  [6, 4],
  [0, 8],
]

export default function CrosswordPoster({ kicker, title, tagline, chips = [], footer }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 })

  return (
    <div
      className="xw"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div
        className="xw__poster"
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, rotateX: -18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.15 }}
      >
        <div className="xw__left">
          <p className="xw__kicker">{kicker}</p>
          <h2 className="xw__title" aria-label={title}>
            {TITLE.map((row, r) => (
              <span key={r} className="xw__trow">
                {row.map((ch, c) =>
                  ch === ' ' ? (
                    <span key={c} className="xw__gap" />
                  ) : (
                    <motion.span
                      key={c}
                      className={`xw__tile ${r === 1 ? 'xw__tile--rose' : ''}`}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (r * 5 + c) * 0.07, type: 'spring', stiffness: 180, damping: 14 }}
                    >
                      {ch}
                    </motion.span>
                  ),
                )}
              </span>
            ))}
          </h2>
          <p className="xw__tagline">{tagline}</p>
          <div className="xw__chips">
            {chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>

        <div className="xw__right" aria-hidden="true">
          <div className="xw__grid">
            {ROWS.map(([start, len], r) => (
              <div key={r} className="xw__row">
                {/* 13 cột: cột k chứa ô thứ k - 1, số thứ tự hàng nằm ngay trước ô đầu tiên */}
                {Array.from({ length: 13 }, (_, k) => {
                  const c = k - 1
                  const on = c >= start && c < start + len
                  const key = c === KEY_COL
                  if (k === start) return <span key={k} className="xw__num">{r + 1}</span>
                  if (!on) return <span key={k} className="xw__void" />
                  return (
                    <motion.span
                      key={k}
                      className={`xw__cell ${key ? 'xw__cell--key' : ''}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + r * 0.08 + c * 0.02, type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      {key ? '?' : ''}
                    </motion.span>
                  )
                })}
              </div>
            ))}
          </div>
          <p className="xw__keyhint">
            <span className="xw__cell xw__cell--key xw__cell--sm">?</span> Từ khóa hàng dọc
          </p>
        </div>

        <span className="xw__deco xw__deco--1">
          <House size={30} />
        </span>
        <span className="xw__deco xw__deco--2">
          <HeartHandshake size={28} />
        </span>
        {footer && <p className="xw__footer">{footer}</p>}
      </motion.div>
    </div>
  )
}
