import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Point3D {
  x: number
  y: number
  z: number
  size: number
  alpha: number
  speedZ: number
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

interface Comet {
  x: number
  y: number
  length: number
  speedX: number
  speedY: number
  alpha: number
}

// 3D Icosahedron Geometry
const PHI = (1 + Math.sqrt(5)) / 2
const ICOSAHEDRON_VERTICES: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
]

const ICOSAHEDRON_EDGES: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9], [10, 11]
]

// 3D Cube Geometry (Left side floating object)
const CUBE_VERTICES: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
]

const CUBE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7]
]

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentThemeConfig } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse & Interaction State
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.0012
      targetMouseY = (e.clientY - height / 2) * 0.0012
    }

    const shockwaves: Shockwave[] = []
    const handleMouseClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.4,
        alpha: 0.8,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleMouseClick)

    // 3D Particles
    const FOCAL_LENGTH = 420
    const PARTICLE_COUNT = Math.min(160, Math.floor(width / 8))
    const particles: Point3D[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * FOCAL_LENGTH * 2,
        size: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        speedZ: Math.random() * 0.8 + 0.3,
      })
    }

    // Shooting Comets
    const comets: Comet[] = []
    const spawnComet = () => {
      if (comets.length < 3 && Math.random() < 0.03) {
        comets.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 80,
          speedX: Math.random() * 6 + 4,
          speedY: Math.random() * 3 + 2,
          alpha: Math.random() * 0.5 + 0.4,
        })
      }
    }

    // Animation Time Counter & Object Rotations
    let time = 0
    let rotX1 = 0, rotY1 = 0, rotZ1 = 0
    let rotX2 = 0, rotY2 = 0, rotZ2 = 0

    // Main Render Loop
    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      rotX1 += 0.005 + mouseY * 0.03
      rotY1 += 0.007 + mouseX * 0.03
      rotZ1 += 0.002

      rotX2 -= 0.006
      rotY2 += 0.004
      rotZ2 += 0.003

      const accentColor = currentThemeConfig.accentPreview || '#38BDF8'
      const isDarkTheme = currentThemeConfig.id !== 'light'
      const drawAccent = isDarkTheme ? accentColor : '#64748B'

      // 1. Draw Dynamic Aurora Radial Ambient Glow in background (Only for dark themes to keep light mode pure white)
      if (isDarkTheme) {
        const glowGrad1 = ctx.createRadialGradient(
          width * 0.75 + Math.sin(time * 0.5) * 80,
          height * 0.35 + Math.cos(time * 0.4) * 60,
          10,
          width * 0.75,
          height * 0.35,
          Math.max(width, height) * 0.45
        )
        glowGrad1.addColorStop(0, `${accentColor}22`)
        glowGrad1.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGrad1
        ctx.fillRect(0, 0, width, height)

        const glowGrad2 = ctx.createRadialGradient(
          width * 0.2 + Math.cos(time * 0.6) * 70,
          height * 0.7 + Math.sin(time * 0.5) * 50,
          10,
          width * 0.2,
          height * 0.7,
          Math.max(width, height) * 0.4
        )
        glowGrad2.addColorStop(0, `${accentColor}18`)
        glowGrad2.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGrad2
        ctx.fillRect(0, 0, width, height)
      }

      // 2. Draw Interactive 3D Cyber Perspective Floor Grid (Waving Grid)
      ctx.strokeStyle = drawAccent
      const gridRows = 16
      const gridCols = 24
      const gridSpacing = width / gridCols
      const horizonY = height * 0.65

      ctx.lineWidth = 0.5
      for (let r = 0; r < gridRows; r++) {
        const rowZ = (r + 1) * 35 - (time * 20) % 35
        const rowScale = FOCAL_LENGTH / (FOCAL_LENGTH + rowZ * 8)
        const screenY = horizonY + rowZ * rowScale * 1.4

        if (screenY <= height) {
          ctx.beginPath()
          ctx.moveTo(0, screenY)
          ctx.lineTo(width, screenY)
          ctx.globalAlpha = Math.min(0.25, (screenY - horizonY) / (height - horizonY) * (isDarkTheme ? 0.2 : 0.08))
          ctx.stroke()
        }
      }

      // Vertical grid perspective rays
      for (let c = -gridCols; c <= gridCols * 2; c += 2) {
        const startX = c * gridSpacing
        ctx.beginPath()
        ctx.moveTo(width / 2 + (startX - width / 2) * 0.1, horizonY)
        ctx.lineTo(startX, height)
        ctx.globalAlpha = isDarkTheme ? 0.08 : 0.04
        ctx.stroke()
      }

      // 3. Draw 3D Particle Starfield with Constellation Connections
      const centerX = width / 2
      const centerY = height / 2

      ctx.fillStyle = accentColor
      particles.forEach((p, i) => {
        p.z -= p.speedZ
        if (p.z <= 0) {
          p.z = FOCAL_LENGTH * 2
          p.x = (Math.random() - 0.5) * width * 1.8
          p.y = (Math.random() - 0.5) * height * 1.8
        }

        const rotPx = p.x * Math.cos(mouseX) - p.y * Math.sin(mouseX)
        const rotPy = p.x * Math.sin(mouseX) + p.y * Math.cos(mouseX)

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z)
        const projX = centerX + rotPx * scale
        const projY = centerY + rotPy * scale

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const depthAlpha = Math.min(1, Math.max(0.1, 1 - p.z / (FOCAL_LENGTH * 2)))
          ctx.beginPath()
          ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2)
          ctx.globalAlpha = depthAlpha * (isDarkTheme ? 0.4 : 0.25)
          ctx.fill()

          // Constellation lines
          for (let j = i + 1; j < particles.length; j += 2) {
            const p2 = particles[j]
            const scale2 = FOCAL_LENGTH / (FOCAL_LENGTH + p2.z)
            const projX2 = centerX + p2.x * scale2
            const projY2 = centerY + p2.y * scale2

            const dx = projX - projX2
            const dy = projY - projY2
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 85) {
              ctx.beginPath()
              ctx.moveTo(projX, projY)
              ctx.lineTo(projX2, projY2)
              ctx.strokeStyle = accentColor
              ctx.globalAlpha = (1 - dist / 85) * 0.14 * depthAlpha
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      })

      // 4. Draw Shooting Energy Comets
      spawnComet()
      comets.forEach((c, idx) => {
        c.x += c.speedX
        c.y += c.speedY
        c.alpha -= 0.005

        if (c.x > width || c.y > height || c.alpha <= 0) {
          comets.splice(idx, 1)
          return
        }

        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.length, c.y - c.length * 0.5)
        grad.addColorStop(0, accentColor)
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(c.x - c.length, c.y - c.length * 0.5)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.8
        ctx.globalAlpha = c.alpha * (isDarkTheme ? 0.6 : 0.4)
        ctx.stroke()
      })

      // 5. Draw 3D Object #1: Rotating Golden Ratio Icosahedron (Right Hero Side)
      const geoScale1 = Math.min(width, height) * 0.19
      const geo1X = width * 0.78
      const geo1Y = height * 0.42

      const rotatedIco = ICOSAHEDRON_VERTICES.map(([vx, vy, vz]) => {
        let y1 = vy * Math.cos(rotX1) - vz * Math.sin(rotX1)
        let z1 = vy * Math.sin(rotX1) + vz * Math.cos(rotX1)
        let x2 = vx * Math.cos(rotY1) + z1 * Math.sin(rotY1)
        let z2 = -vx * Math.sin(rotY1) + z1 * Math.cos(rotY1)
        let x3 = x2 * Math.cos(rotZ1) - y1 * Math.sin(rotZ1)
        let y3 = x2 * Math.sin(rotZ1) + y1 * Math.cos(rotZ1)
        return [x3, y3, z2]
      })

      const projIco = rotatedIco.map(([vx, vy, vz]) => {
        const perspective = 320 / (320 + vz * 35)
        return {
          px: geo1X + vx * geoScale1 * perspective,
          py: geo1Y + vy * geoScale1 * perspective,
          vz,
        }
      })

      ctx.lineWidth = 1.2
      ctx.strokeStyle = accentColor
      ICOSAHEDRON_EDGES.forEach(([i1, i2]) => {
        const v1 = projIco[i1]
        const v2 = projIco[i2]
        const avgZ = (v1.vz + v2.vz) / 2
        const alpha = Math.min(0.7, Math.max(0.1, (avgZ + 2) / 4))

        ctx.beginPath()
        ctx.moveTo(v1.px, v1.py)
        ctx.lineTo(v2.px, v2.py)
        ctx.globalAlpha = alpha * (isDarkTheme ? 0.4 : 0.28)
        ctx.stroke()
      })

      projIco.forEach((v) => {
        const alpha = Math.min(0.85, Math.max(0.2, (v.vz + 2) / 4))
        ctx.beginPath()
        ctx.arc(v.px, v.py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.globalAlpha = alpha * (isDarkTheme ? 0.7 : 0.45)
        ctx.fill()
      })

      // 6. Draw 3D Object #2: Floating Rotating 3D Wireframe Cube (Left Side Accent)
      const geoScale2 = Math.min(width, height) * 0.11
      const geo2X = width * 0.14
      const geo2Y = height * 0.75 + Math.sin(time * 0.8) * 15

      const rotatedCube = CUBE_VERTICES.map(([vx, vy, vz]) => {
        let y1 = vy * Math.cos(rotX2) - vz * Math.sin(rotX2)
        let z1 = vy * Math.sin(rotX2) + vz * Math.cos(rotX2)
        let x2 = vx * Math.cos(rotY2) + z1 * Math.sin(rotY2)
        let z2 = -vx * Math.sin(rotY2) + z1 * Math.cos(rotY2)
        let x3 = x2 * Math.cos(rotZ2) - y1 * Math.sin(rotZ2)
        let y3 = x2 * Math.sin(rotZ2) + y1 * Math.cos(rotZ2)
        return [x3, y3, z2]
      })

      const projCube = rotatedCube.map(([vx, vy, vz]) => {
        const perspective = 300 / (300 + vz * 30)
        return {
          px: geo2X + vx * geoScale2 * perspective,
          py: geo2Y + vy * geoScale2 * perspective,
          vz,
        }
      })

      ctx.lineWidth = 1.0
      ctx.strokeStyle = accentColor
      CUBE_EDGES.forEach(([i1, i2]) => {
        const v1 = projCube[i1]
        const v2 = projCube[i2]
        const avgZ = (v1.vz + v2.vz) / 2
        const alpha = Math.min(0.5, Math.max(0.08, (avgZ + 2) / 4))

        ctx.beginPath()
        ctx.moveTo(v1.px, v1.py)
        ctx.lineTo(v2.px, v2.py)
        ctx.globalAlpha = alpha * (isDarkTheme ? 0.3 : 0.18)
        ctx.stroke()
      })

      // 7. Draw Click Interactive 3D Shockwaves
      shockwaves.forEach((sw, idx) => {
        sw.radius += 8
        sw.alpha -= 0.015

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(idx, 1)
          return
        }

        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = accentColor
        ctx.lineWidth = 2
        ctx.globalAlpha = sw.alpha * (isDarkTheme ? 0.6 : 0.4)
        ctx.stroke()
      })

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleMouseClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentThemeConfig])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.9,
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}
