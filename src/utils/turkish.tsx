export function locativeSuffix(name: string, apostrophe = true): string {
  const vowels = 'aeıioöuü'
  const vowelsBack = 'aıou'

  let lastVowel = null
  for (let i = name.length - 1; i >= 0; i--) {
    if (vowels.includes(name[i])) {
      lastVowel = name[i]
      break
    }
  }
  let suffix = lastVowel && vowelsBack.includes(lastVowel) ? 'da' : 'de'

  if (apostrophe) {
    /*
      const lastTwoChars = name.slice(-2)
      if (vowels.includes(lastTwoChars[0]) || lastTwoChars[1] === 'e' || lastTwoChars[1] === 'a') {
        suffix = "'" + suffix
      }
       */
    suffix = "'" + suffix
  }

  return name + suffix
}

export function withLocativeSuffix(locale: string, name: string): string {
  if (locale === 'tr') {
    return locativeSuffix(name)
  }
  return name
}
