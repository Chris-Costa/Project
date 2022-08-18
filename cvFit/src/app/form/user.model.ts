import { IBlogPost } from "../blog/blogPost";
import { IWorkout } from "../exercises/workoutList/workout";

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
    
}