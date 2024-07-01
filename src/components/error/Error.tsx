interface Props {
  error: string;
}

export function Error({
  error
}: Props) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-5" role="alert">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  )
}
