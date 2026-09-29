import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}
export const rise = {
  hidden: { opacity: 0, y: 26, rotateX: -18 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
}

export function Shell({ kicker, title, children, className = '' }) {
  return (
    <motion.div className={`shell ${className}`} variants={stagger} initial="hidden" animate="show">
      {kicker && (
        <motion.p className="kicker" variants={rise}>
          {kicker}
        </motion.p>
      )}
      {title && (
        <motion.h2 className="title" variants={rise}>
          {title}
        </motion.h2>
      )}
      {children}
    </motion.div>
  )
}

export const Item = ({ as = 'div', className, children, ...rest }) => {
  const C = motion[as]
  return (
    <C className={className} variants={rise} {...rest}>
      {children}
    </C>
  )
}

export function SourceLink({ img }) {
  if (!img?.sourceUrl) return null
  return (
    <a className="source" href={img.sourceUrl} target="_blank" rel="noreferrer" title={img.sourceTitle}>
      Nguồn: {img.sourceName}
    </a>
  )
}

// Ảnh nghiêng 3D theo chuột + chú thích + nguồn; `extra` là ảnh phụ xếp chồng ở góc dưới
export function Figure({ img, extra, className = '', tall = false }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 160, damping: 16 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 160, damping: 16 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  if (!img) return null
  return (
    <motion.figure
      className={`figure ${tall ? 'figure--tall' : ''} ${className}`}
      variants={rise}
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
      <div className={`figure__wrap ${extra ? 'has-extra' : ''}`}>
        <motion.div className="figure__card" style={{ rotateX: rx, rotateY: ry }}>
          <img src={img.file} alt={img.caption} loading="lazy" draggable="false" />
          <motion.span className="figure__glare" style={{ left: glareX }} />
        </motion.div>
        {extra && (
          <motion.div
            className="figure__extra"
            initial={{ opacity: 0, y: 30, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 14 }}
            whileHover={{ scale: 1.9, rotate: 0, zIndex: 3 }}
          >
            <img src={extra.file} alt={extra.caption} loading="lazy" draggable="false" />
          </motion.div>
        )}
      </div>
      <figcaption title={img.caption}>
        <span className="figure__cap">{img.caption}</span>
        <span className="figure__srcs">
          <SourceLink img={img} />
          {extra && (
            <span title={extra.caption}>
              Ảnh nhỏ · <SourceLink img={extra} />
            </span>
          )}
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function Quote({ children, cite, big = false, avatar }) {
  return (
    <Item as="blockquote" className={`quote ${big ? 'quote--big' : ''} ${avatar ? 'quote--avatar' : ''}`}>
      {avatar ? (
        <a className="quote__avatar" href={avatar.sourceUrl} target="_blank" rel="noreferrer" title={`${avatar.caption} — Nguồn: ${avatar.sourceName}`}>
          <img src={avatar.file} alt={avatar.caption} draggable="false" />
        </a>
      ) : (
        <span className="quote__mark">“</span>
      )}
      <p>{children}</p>
      {cite && <cite>— {cite}</cite>}
    </Item>
  )
}

export function Cards({ items, cols = 3 }) {
  return (
    <motion.div className="cards" style={{ '--cols': cols }} variants={stagger}>
      {items.map((it, i) => (
        <Item key={it.t} className="card">
          <span className="card__no">{String(i + 1).padStart(2, '0')}</span>
          <h3>{it.t}</h3>
          {it.d && <p>{it.d}</p>}
        </Item>
      ))}
    </motion.div>
  )
}

export function Bullets({ items }) {
  return (
    <motion.ul className="bullets" variants={stagger}>
      {items.map((b) => (
        <Item as="li" key={b}>
          {b}
        </Item>
      ))}
    </motion.ul>
  )
}

// Thẻ lật 3D; `forced` cho phép slide lật tất cả thẻ cùng lúc
export function FlipCard({ front, back, label, hint = 'Bấm để lật ↻', forced, className = '' }) {
  const [flipped, setFlipped] = useState(false)
  const on = forced ?? flipped
  return (
    <Item className={`flip ${className}`}>
      <button
        type="button"
        className={`flip__inner ${on ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={on}
      >
        <span className="flip__face flip__front">
          {label && <em>{label}</em>}
          {front}
          {hint && <small>{hint}</small>}
        </span>
        <span className="flip__face flip__back">{back}</span>
      </button>
    </Item>
  )
}
