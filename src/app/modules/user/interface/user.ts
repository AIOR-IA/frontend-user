export interface User {
    id:        string;
    username:  string;
    email:     string;
    password?:  string;
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
}