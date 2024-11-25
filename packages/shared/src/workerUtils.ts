const isSameOrigin = (baseUrl: string, otherUrl: string) => {
  let base
  try {
    base = new URL(baseUrl)
    if (!base.origin || base.origin === "null") {
      return false // non-HTTP url
    }
  } catch {
    return false
  }

  const other = new URL(otherUrl, base)
  return base.origin === other.origin
}

export const fixUrlOrigin = (url: string) => (isSameOrigin(window.location.href, url) ? url : window.location.origin + new URL(url).pathname)
