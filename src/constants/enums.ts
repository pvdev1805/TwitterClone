export enum UserVerifyStatus {
  Unverified, // have not verified email, by default, it is equal to 0
  Verified, // have verified email
  Banned // have been banned
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
