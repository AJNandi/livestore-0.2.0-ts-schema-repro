export function getAuthRedirectUrl(dev_mode: boolean, AUTHKIT_URL: string, API_URL: string, env: "web" | "desktop", signup: boolean) {
  const is_dev = dev_mode ? "_dev" : ""
  const isSignup = signup ? "sign-up" : ""
  const url = `https://${AUTHKIT_URL}/${isSignup}?redirect_uri=${API_URL}/api/v1/auth/${env + is_dev}`
  return url
}

export const getDesktopDeepLinkUrl = (instantToken: string) => `subset://auth_success?code=${instantToken}`
