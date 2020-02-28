export interface IPayloadAuth {
  sub: string;
  providerData: {
    thirdPartyId: string,
    provider: string,
  };
}
