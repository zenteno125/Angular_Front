
export interface Response<T>{

    message?: string;
    data: T;

}

export interface IUser {
    _id?: number;
    name: string;
    age: number;
    gender: string;
    
}