import { ILifts } from "./workout";

export interface workoutP{
    title: string;
    lift: ILifts[];
}

export interface liftP{
    name: string;
}