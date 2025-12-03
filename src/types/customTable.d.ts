import type React from "react"

export interface CustomTableProps {
  headers: string[]
  rows: React.ReactNode[][]
}