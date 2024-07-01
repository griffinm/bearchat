interface Props {
  children?: React.ReactNode;
}

export function Card({
  children
}: Props) {
  return (
    <div className="shadow-lg p-5 rounded-lg bg-white">
      {children}
    </div>
  )
}
