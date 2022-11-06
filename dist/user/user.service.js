"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("./user");
const uuid_1 = require("uuid");
const roles_enum_1 = require("../auth/roles.enum");
let UserService = class UserService {
    constructor() {
        this.users = [
            new user_1.User((0, uuid_1.v4)(), "Admin", "Admin2022*", [roles_enum_1.Role.ADMIN]),
            new user_1.User((0, uuid_1.v4)(), "User", "User2022*", [roles_enum_1.Role.USER]),
            new user_1.User((0, uuid_1.v4)(), "CultureUser", "User2022*", [roles_enum_1.Role.CULTURE_USER]),
            new user_1.User((0, uuid_1.v4)(), "RegionUser", "User2022*", [roles_enum_1.Role.REGION_USER]),
            new user_1.User((0, uuid_1.v4)(), "WriteUser", "User2022*", [roles_enum_1.Role.WRITE_USER]),
            new user_1.User((0, uuid_1.v4)(), "DeleteUser", "User2022*", [roles_enum_1.Role.DELETE_USER])
        ];
    }
    async findOne(username) {
        return this.users.find(user => user.username === username);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map