import { CircularProgress } from "@mui/material";

export function LoadingSpinner() {
  return (
    <div className="mt-[10rem] h-sceen w-screen text-center">
      <CircularProgress />
    </div>
  )
}