import { CityDto } from 'src/city/city.dto';
import { CityEntity } from 'src/city/city.entity';
import { CountryCityService } from './country-city.service';
export declare class CountryCityController {
    private readonly CountryCityService;
    constructor(CountryCityService: CountryCityService);
    addTiendaProduct(countryId: string, cityId: string): Promise<import("../country/country.entity").CountryEntity>;
    findTiendaBycountryIdcityId(countryId: string, cityId: string): Promise<CityEntity>;
    findcitiesBycountryId(countryId: string): Promise<CityEntity[]>;
    associatecitiesProducto(citiesDto: CityDto[], countryId: string): Promise<import("../country/country.entity").CountryEntity>;
    deleteTiendaProducto(countryId: string, cityId: string): Promise<void>;
}
