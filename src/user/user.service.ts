/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../auth/roles.enum';

@Injectable()
export class UserService {
    private users: User[] = [
        new User(uuidv4(), "Admin", "Admin2022*", [Role.ADMIN]),
        new User(uuidv4(), "User", "User2022*", [Role.USER]),
        new User(uuidv4(), "CultureUser", "User2022*", [Role.CULTURE_USER]),
        new User(uuidv4(), "RegionUser", "User2022*", [Role.REGION_USER]),
        new User(uuidv4(), "WriteUser", "User2022*", [Role.WRITE_USER]),
        new User(uuidv4(), "DeleteUser", "User2022*", [Role.DELETE_USER])
    ];
 
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
