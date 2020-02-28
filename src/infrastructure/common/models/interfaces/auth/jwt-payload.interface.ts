export interface IJwtPayload {
  readonly id: string;
  readonly provider: string;
  readonly thirdPartyId: string;
  readonly iat: string;
  readonly exp: string;
}
