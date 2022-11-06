import { CultureDto } from './culture.dto';
import { CultureEntity } from './culture.entity';
import { CultureService } from './culture.service';
export declare class CultureController {
    private readonly cultureService;
    constructor(cultureService: CultureService);
    findAll(): Promise<CultureEntity[]>;
    findOne(cultureId: string): Promise<CultureEntity>;
    create(cultureDto: CultureDto): Promise<CultureEntity>;
    update(cultureId: string, cultureDto: CultureDto): Promise<CultureEntity>;
    delete(cultureId: string): Promise<void>;
}
