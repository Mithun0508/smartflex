// lib/tmp.ts
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

export async function writeTemp(prefix: string, ext: string, buffer: Buffer) {
  const name = `${prefix}-${crypto.randomBytes(8).toString("hex")}.${ext}`
  const filePath = path.join(process.cwd(), "tmp", name)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, buffer)
  return filePath
}

export async function readFile(filePath: string) {
  return fs.readFile(filePath)
}

export async function safeUnlink(filePath?: string) {
  if (!filePath) return
  try {
    await fs.unlink(filePath)
  } catch {}
}
