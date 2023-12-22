export interface Role {
    id:number,
    name:string,
    authorityLevel:number,
    privileges?:Privilege[],
}

export interface Privilege {
    id:number,
    name:string,
}