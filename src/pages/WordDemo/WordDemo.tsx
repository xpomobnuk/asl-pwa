import { FingerspellWord }
from '../../components/FingerspellWord/FingerspellWord'

export const WordDemo = () => {
  return (
    <div className="container">

      <h1>Word Demo</h1>

      <FingerspellWord
        word="CAT"
        letters={['C', 'A', 'T']}
      />

    </div>
  )
}