#!/usr/bin/env node
/**
 * Optimize images in public/images and public/team for smaller file size.
 * Run before building for production or before deploying to GitHub Pages.
 * Usage: npm run optimize-images
 *
 * Requires: npm install --save-dev sharp
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

const DIRS = ['images', 'team']
const EXTENSIONS = ['.jpg', '.jpeg', '.png']
const JPEG_QUALITY = 85
const PNG_COMPRESSION_LEVEL = 9

async function optimizeImages() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('sharp is required. Run: npm install --save-dev sharp')
    process.exit(1)
  }

  let totalSaved = 0
  let count = 0

  for (const dir of DIRS) {
    const dirPath = path.join(publicDir, dir)
    if (!fs.existsSync(dirPath)) continue

    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    for (const ent of entries) {
      if (!ent.isFile()) continue
      const ext = path.extname(ent.name).toLowerCase()
      if (!EXTENSIONS.includes(ext)) continue

      const filePath = path.join(dirPath, ent.name)
      const before = fs.statSync(filePath).size
      try {
        const isJpeg = ['.jpg', '.jpeg'].includes(ext)
        const buffer = await sharp(filePath)
          [isJpeg ? 'jpeg' : 'png'](
            isJpeg ? { quality: JPEG_QUALITY } : { compressionLevel: PNG_COMPRESSION_LEVEL }
          )
          .toBuffer()
        fs.writeFileSync(filePath, buffer)
        const after = buffer.length
        const saved = before - after
        if (saved > 0) {
          totalSaved += saved
          count++
          console.log(`${path.relative(root, filePath)}: ${(saved / 1024).toFixed(1)} KB smaller`)
        }
      } catch (err) {
        console.warn(`Skip ${ent.name}:`, err.message)
      }
    }
  }

  if (count > 0) {
    console.log(`\nOptimized ${count} image(s), saved ${(totalSaved / 1024).toFixed(1)} KB total.`)
  } else {
    console.log('No images needed optimization or no matching files found.')
  }
}

optimizeImages().catch((err) => {
  console.error(err)
  process.exit(1)
})
