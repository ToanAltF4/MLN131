import Deck from './components/Deck'
import { SECTIONS, SLIDES } from './data/slides'

export default function App() {
  return <Deck slides={SLIDES} sections={SECTIONS} />
}
