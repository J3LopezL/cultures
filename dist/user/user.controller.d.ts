import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
    }>;
}
