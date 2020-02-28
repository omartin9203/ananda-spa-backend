export interface IUserAuhtenticated {
    readonly id: string;
    readonly roles: string;
    readonly email?: string;
    readonly userName?: string;
}