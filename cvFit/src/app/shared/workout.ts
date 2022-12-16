export interface ILifts{
    id?: number;
    name?: string,
    weight?: number;
    sets?: number;
    reps?: number;    
}

export interface IWorkout{
    id?: number;
    azureId: string;
    title?: string;
    lift?: ILifts[];
}