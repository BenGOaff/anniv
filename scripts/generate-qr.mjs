#!/usr/bin/env node
/* Genere le QR code du jeu en SVG + PNG.
   Usage : npm run qr -- https://mon-domaine.tld/cs-57-7f3k9x/           */

import { mkdir, writeFile } from 'node:fs/promises'
import QRCode from 'qrcode'

const url = process.argv[2]
if (!url) {
  console.error('Usage : npm run qr -- <url-du-jeu>')
  process.exit(1)
}

const options = {
  errorCorrectionLevel: 'H',
  margin: 2,
  width: 1024,
  color: { dark: '#131A2AFF', light: '#F5F3EEFF' },
}

await mkdir('qr', { recursive: true })

const svg = await QRCode.toString(url, { ...options, type: 'svg' })
await writeFile('qr/chapitre-57.svg', svg)

const png = await QRCode.toBuffer(url, { ...options, type: 'png' })
await writeFile('qr/chapitre-57.png', png)

console.log('QR genere pour', url)
console.log('  qr/chapitre-57.svg')
console.log('  qr/chapitre-57.png')
