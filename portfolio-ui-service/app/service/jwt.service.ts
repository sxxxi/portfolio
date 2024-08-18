
export default class JwtService {
  private static TOKEN_KEY = 'sxxxi-token'

  /**
   * Get token from session storage.
   * Redirect to login if expired, invalid, or does not exist.
   */
  static getToken(onError: () => void): string | null {
    let token = sessionStorage.getItem(this.TOKEN_KEY)
    if (!token) {
      onError()
      return null;
    } 
    return token
  }
}