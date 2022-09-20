export interface IUserData{
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    goal: number;
    likedPosts?: number[];
    workouts?: {
        title: string;
        lift: {
            name: string;
            weight: number|string;
            sets: number;
            reps: number;
        }
    }
}