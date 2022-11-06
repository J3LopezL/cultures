import { User } from './user';
export declare class UserService {
    private users;
    findOne(username: string): Promise<User | undefined>;
}
