export interface IBlogPost{
    blogId: number;
    blogTitle: string; 
    blogAuthor: string;
    blogContent: string;
    authorAvatar: string;
    likes: number;
    comments: IComment[];
}
export interface IComment{
    user: string;
    reply: string;
}
export interface ILikedPosts{
    userId: number;
    postIds: number[];
}