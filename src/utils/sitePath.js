const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function sitePath(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}` || '/'
}

export function currentSitePath() {
  const pathname = window.location.pathname
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/'
  }
  return pathname
}
