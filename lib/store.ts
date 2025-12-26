// lib/store.ts
type UserRecord = {
  id: string
  email: string
  pro: boolean
  credits: number
  monthVideoOps: number
  monthImageOps: number
}

const db: Record<string, UserRecord> = {}

const DEFAULT_USER_ID = "demo-user"

export function getUser(): UserRecord {
  if (!db[DEFAULT_USER_ID]) {
    db[DEFAULT_USER_ID] = {
      id: DEFAULT_USER_ID,
      email: "demo@smartflex.local",
      pro: false,
      credits: 0,
      monthVideoOps: 0,
      monthImageOps: 0,
    }
  }
  return db[DEFAULT_USER_ID]
}

export function addCredit(count = 1) {
  const u = getUser()
  u.credits += count
  return u
}

export function togglePro(on: boolean) {
  const u = getUser()
  u.pro = on
  return u
}

export function incVideoOps() {
  const u = getUser()
  u.monthVideoOps += 1
  return u
}

export function incImageOps() {
  const u = getUser()
  u.monthImageOps += 1
  return u
}

export function consumeCredit() {
  const u = getUser()
  if (u.credits > 0) {
    u.credits -= 1
    return true
  }
  return false
}
