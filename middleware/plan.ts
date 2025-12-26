// middleware/plan.ts
import { getUser } from "@/lib/store"

export function canUsePremiumPreset(): { allowed: boolean; reason?: string } {
  const u = getUser()
  if (u.pro) return { allowed: true }
  if (u.credits > 0) return { allowed: true }
  return { allowed: false, reason: "Premium preset requires Pro or 1 credit." }
}

export function canDoVideoOp(): { allowed: boolean; reason?: string } {
  const u = getUser()
  const FREE_CAP = 10
  if (u.monthVideoOps < FREE_CAP) return { allowed: true }
  if (u.pro || u.credits > 0) return { allowed: true }
  return { allowed: false, reason: "Free limit reached. Upgrade or buy a credit." }
}

export function canDoImageOp(): { allowed: boolean; reason?: string } {
  const u = getUser()
  const FREE_CAP = 5
  if (u.monthImageOps < FREE_CAP) return { allowed: true }
  if (u.pro || u.credits > 0) return { allowed: true }
  return { allowed: false, reason: "Free limit reached. Upgrade or buy a credit." }
}
