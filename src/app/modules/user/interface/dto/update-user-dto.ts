export interface UpdateUserDto {
    [x: string]: any;
    username?: string;
    email?:    string;
    password?: string;
    isActive?: string;
}