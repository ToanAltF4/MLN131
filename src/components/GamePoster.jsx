import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ExternalLink, Gamepad2, Heart, House, Lock, Puzzle, Sparkles, Trophy } from 'lucide-react'
import { Item, stagger } from './ui'

// Poster game: hiện poster mặc định (vẽ bằng CSS) cho tới khi có game thật.
// Điền url / embedUrl / poster trong src/data/games.js để gắn game.
export default function GamePoster({ game, thanks = false }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 16 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 16 })
  const ready = Boolean(game.url || game.embedUrl)

  return (
    <motion.div className="game" variants={stagger} initial="hidden" animate="show">
      <Item
        className="game__stage"
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
        <motion.div className="game__poster" style={{ rotateX: rx, rotateY: ry }}>
          {game.embedUrl ? (
            <iframe className="game__frame" src={game.embedUrl} title={game.title} allow="fullscreen; autoplay" />
          ) : game.poster ? (
            <img className="game__img" src={game.poster} alt={`Poster game ${game.title}`} draggable="false" />
          ) : (
            <div className="game__art" aria-hidden="true">
              <span className="game__ribbon">{game.status}</span>
              <span className="game__floater game__floater--1">
                <House size={34} />
              </span>
              <span className="game__floater game__floater--2">
                <Heart size={30} />
              </span>
              <span className="game__floater game__floater--3">
                <Puzzle size={28} />
              </span>
              <span className="game__floater game__floater--4">
                <Trophy size={30} />
              </span>
              <span className="game__icon">
                <Gamepad2 size={64} strokeWidth={1.5} />
              </span>
              <span className="game__word">GAME</span>
              <span className="game__name">{game.title}</span>
              <span className="game__slot">Khu vực gắn game</span>
            </div>
          )}
        </motion.div>
      </Item>

      <div className="game__side">
        <Item as="p" className="kicker">
          {game.kicker}
        </Item>
        <Item as="h2" className="title">
          {game.title}
        </Item>
        <Item as="p" className="lead">
          {game.tagline}
        </Item>
        <motion.div className="chips" variants={stagger}>
          {game.chips.map((c) => (
            <Item key={c} as="span" className="chip">
              {c}
            </Item>
          ))}
        </motion.div>
        <Item className="game__cta">
          {game.url ? (
            <a className="game__btn" href={game.url} target="_blank" rel="noreferrer">
              <ExternalLink size={18} /> Vào chơi
            </a>
          ) : (
            <span className={`game__btn ${ready ? '' : 'is-off'}`}>
              {ready ? <Sparkles size={18} /> : <Lock size={18} />} {ready ? 'Chơi ngay trên slide' : 'Sắp ra mắt'}
            </span>
          )}
        </Item>
        {thanks && (
          <Item as="p" className="game__thanks">
            Cảm ơn thầy và các bạn đã lắng nghe!
          </Item>
        )}
      </div>
    </motion.div>
  )
}
