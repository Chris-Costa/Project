import { internals } from "@azure/msal-browser";

export interface IBlogPost{
    id?: number;
    title?: string; 
    author?: string;
    content?: string;
    avatar?: string;
    category?: number;
    comment?: IComment[];
}
export interface IComment{
    user: string;
    reply: string;
}