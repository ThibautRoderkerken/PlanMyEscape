export interface ICertificate {
    id:number,
    name:string,
    domain:string,
    expiresAt:Date,
    renewWarningWithin:number
}