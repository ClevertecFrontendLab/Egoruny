export type AuthDataType = {
    confirmPassword: any;
    password: any;
    email: any;
    location: any;
    isRemember: boolean;
};

export type AuthType = {
    jwt: any;
    isLogged: boolean;
    error: any;
    checkBox: boolean;
    user: any;
};

export type Exercise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
};

export type Training = {
    _id?: string;
    name: string;
    date: string;
    exercises: Exercise[];
    isImplementation?: boolean;
};

declare const ValidateStatuses: ['success', 'warning', 'error', 'validating', ''];
export type ValidateStatus = (typeof ValidateStatuses)[number];
