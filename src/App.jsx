import { lazy, Suspense } from 'react'
import Deck from './components/Deck'
import { SECTIONS, SLIDES } from './data/slides'

// Trang game tải riêng, không làm nặng phần trình chiếu
const GamePage = lazy(() => import('./game/GamePage'))
const isGame = window.location.pathname.replace(/\/+$/, '') === '/game'

export default function App() {
  if (isGame)
    return (
      <Suspense fallback={null}>
        <GamePage />
      </Suspense>
    )
  return <Deck slides={SLIDES} sections={SECTIONS} />
}
