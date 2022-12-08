import { IWorkout } from "./workout";

export interface IUserData{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    azureId: string;
    avatar: string;
    weightGoal: number;
    //likedPosts?: number[];
    workout?: IWorkout[];
}