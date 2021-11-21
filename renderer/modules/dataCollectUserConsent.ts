const LOCAL_STORAGE_KEY = 'dataCollectUserContent'

export function getDataCollectUserContent(): boolean | null {
  if (typeof window === 'undefined') {
    return null
  }

  const userConsent = localStorage.getItem(LOCAL_STORAGE_KEY)
  return userConsent !== null ? userConsent === 'true' : null
}

export function setDataCollectUserContent(userConsent: boolean): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, userConsent.toString())
}

export function resetDataCollectUserContent(): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
