export type User = {
    id: string;
    name: string;
    age: number;
    city: string;
    address: string;
    company: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersState {
    data: User[];
    isLoading: boolean;
    isError: boolean;
}

export interface UserFormErrors {
    name?: string;
    age?: string;
    city?: string;
    address?: string;
    company?: string;
    email?: string;
    phone?: string;
}

export interface UserFormFields {
    id: string;
    label: string;
    placeHolder: string;
    errorMessage: string;
    isRequired: boolean;
    inputType: string;
}