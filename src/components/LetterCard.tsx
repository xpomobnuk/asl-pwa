type Props = {
  letter: string
  onClick: () => void
  status?: 'new' | 'done'
}

export const LetterCard = ({ letter, onClick, status }: Props) => {
  return (
    <div className={`card ${status}`} onClick={onClick}>
      {letter}
    </div>
  )
}