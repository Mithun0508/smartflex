// ❌ Purana: Isme ClerkProvider tha, ise hatao
// ✅ Naya: Simple layout rakhein
import type { ReactNode } from "react"

export default function NestedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}