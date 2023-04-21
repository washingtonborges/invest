export interface LoginResponse {
    validUser: {
        _id: string;
        name: string;
        username: string;
        email: string;
        password: string;
    };
    token: string;
}  