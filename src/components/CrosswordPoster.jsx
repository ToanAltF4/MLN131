import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { HeartHandshake, House } from 'lucide-react'

// Poster trò chơi ô chữ tổng kết (chơi trên giấy). Lưới đúng số hàng, số ô như phiếu giấy của nhóm;
// ô để trống, cột từ khóa ghi "?", không lộ đáp án.
const TITLE = [['T', 'R', 'Ò'], ['C', 'H', 'Ơ', 'I'], ['Ô', ' ', 'C', 'H', 'Ữ']]
const COLS = 18
const KEY_COL = 9
// [cột bắt đầu (0 – 17), số ô] của 10 hàng ngang
const ROWS = [
  [0, 10],
  [4, 11],
  [9, 8],
  [4, 6],
  [8, 7],
  [9, 8],
  [8, 8],
  [5, 7],
  [3, 9],
  [5, 13],
]
const pad = (n) => String(n).padStart(2, '0')

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
                      className={`xw__tile ${r === 2 ? 'xw__tile--rose' : ''}`}
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
          <div className="xw__grid" style={{ '--cols': COLS }}>
            <div className="xw__row xw__row--head">
              <span className="xw__num" />
              <span className="xw__codehead">Mã</span>
              <span />
              {Array.from({ length: COLS }, (_, c) =>
                c === KEY_COL ? (
                  <span key={c} className="xw__keyhead">
                    Cột từ khóa
                  </span>
                ) : (
                  <span key={c} />
                ),
              )}
            </div>
            {ROWS.map(([start, len], r) => (
              <div key={r} className="xw__row">
                <span className="xw__num">{pad(r + 1)}</span>
                <span className="xw__code" />
                <span />
                {Array.from({ length: COLS }, (_, c) => {
                  if (c < start || c >= start + len) return <span key={c} className="xw__void" />
                  const key = c === KEY_COL
                  return (
                    <motion.span
                      key={c}
                      className={`xw__cell ${key ? 'xw__cell--key' : ''}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + r * 0.06 + c * 0.015, type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      {key ? '?' : ''}
                    </motion.span>
                  )
                })}
              </div>
            ))}
          </div>
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
