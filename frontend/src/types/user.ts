export type User = {
  email: string
}

export type AuthResult = {
  data: { authenticated: boolean }
  authenticated: boolean
}

export default User
