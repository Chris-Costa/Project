export interface ILifts{
    name: string,
    weight: number|string;
    sets: number;
    reps: number;    
}

export interface IWorkout{
    title: string;
    lift: ILifts[];
}