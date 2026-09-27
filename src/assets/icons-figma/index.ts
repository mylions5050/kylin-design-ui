// Auto-discover Figma-exported SVGs dropped in this folder. Each becomes
// usable as <KIcon name="<filename>"> (filename without .svg). No manual
// registry — add/remove .svg files and the list updates (HMR in dev).
//
// SVGs render inline with their original colors. To make an icon follow the
// `color` prop / surrounding text color, open the SVG and set its fills to
// `currentColor` (the container already passes color through).
const modules = import.meta.glob('./*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const figmaIcons: Record<string, string> = {}
for (const [path, svg] of Object.entries(modules)) {
  // './sample-star.svg' -> 'sample-star'
  const name = path.slice('./'.length, -'.svg'.length)
  figmaIcons[name] = svg
}

export const figmaIconNames = Object.keys(figmaIcons)
