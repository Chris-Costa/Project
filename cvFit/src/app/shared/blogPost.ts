export interface IBlogPost{
    id?: number;
    title?: string; 
    author?: string;
    content?: string;
    avatar?: string;
    likes?: number;
    comment?: IComment[];
}
export interface IComment{
    user: string;
    reply: string;
}
export interface ILikedPosts{
    userId: number;
    postIds: number[];
}