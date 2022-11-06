import { CultureService } from './culture.service';
import { CultureEntity } from './culture.entity';
import { CultureDto } from './culture.dto';
export declare class CultureResolver {
    private cultureService;
    constructor(cultureService: CultureService);
    cultures(): Promise<CultureEntity[]>;
    culture(id: string): Promise<CultureEntity>;
    createCulture(cultureDto: CultureDto): Promise<CultureEntity>;
    updateCulture(id: string, cultureDto: CultureDto): Promise<CultureEntity>;
    deleteCulture(id: string): string;
}
