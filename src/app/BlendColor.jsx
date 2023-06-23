export const blendColors = (colorA, colorB, amount) => {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16))
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16))
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, '0')
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, '0')
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, '0')
  return `#${r}${g}${b}`
}

export const blendRGBColorArray = (colorArray) => {
  const rgbPattern = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  if (colorArray.some((color) => !rgbPattern.test(color))) {
    return null
  }
  if (colorArray.length >= 2) {
    return colorArray
      .splice(1)
      .reduce(
        (finalColor, color) => blendColors(finalColor, color, 0.5),
        colorArray[0],
      )
  }
  if (colorArray.length === 1) {
    return colorArray[0]
  }
  return 'transparent'
}