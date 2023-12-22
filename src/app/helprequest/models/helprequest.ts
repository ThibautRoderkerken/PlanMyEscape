export interface IHelpRequest {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    object: string;
    body: string;
    createdAt: Date;
    isSolved: boolean;
}

export class HelpRequest implements IHelpRequest {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    object: string;
    body: string;
    createdAt: Date = new Date ();
    isSolved: boolean;
}