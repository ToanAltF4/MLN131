import { useEffect, useRef } from 'react'
import Scene3D from '../components/Scene3D'
import { GAME_HTML } from './markup'
import { GameController } from './controller'
import './game.css'

// Trang /game: game "Nhà Mình Ổn Không?" (nội dung + thuật toán giữ nguyên từ bản gốc).
// Giao diện HTML được dựng một lần, GameController điều khiển DOM y như bản gốc;
// cảnh 3D ngôi nhà của web thay cho diorama three.js cũ.
export default function GamePage() {
  const root = useRef(null)
  const mood = useRef({ crisis: false, bond: 60, pulse: 0 })

  useEffect(() => {
    document.title = 'Nhà Mình Ổn Không? — MLN131 Nhóm 6'
    const el = root.current
    if (!el.__game) {
      // 3 hàm mà GameController gọi tới cảnh 3D
      const diorama = {
        setCameraState: (mode) => {
          el.dataset.mode = mode
        },
        updateAtmosphere: (stats, isCrisis = false) => {
          mood.current.bond = stats.bond
          mood.current.crisis = isCrisis
        },
        triggerActionReaction: () => {
          mood.current.pulse += 1
        },
      }
      el.__game = new GameController(diorama)
    }
    el.__game.attachKeyboard()
    return () => el.__game.detachKeyboard()
  }, [])

  return (
    <div className="gm-page">
      <div className="backdrop" aria-hidden="true" />
      <Scene3D pose="backdrop" mood={mood} />
      <div className="grain" aria-hidden="true" />
      <div ref={root} className="gm" data-mode="intro" dangerouslySetInnerHTML={{ __html: GAME_HTML }} />
    </div>
  )
}
