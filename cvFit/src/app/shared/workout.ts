export interface ILifts{
    id?: number;
    name?: string,
    weight?: number|string;
    sets?: number;
    reps?: number;    
}

export interface IWorkout{
    id?: number;
    azureId: string;
    title?: string;
    lift?: ILifts[];
}