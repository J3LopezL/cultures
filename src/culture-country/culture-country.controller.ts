/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { CountryDto } from 'src/country/country.dto';
import { CountryEntity } from 'src/country/country.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CultureCountryService } from './culture-country.service';

@Controller('cultures')
@UseInterceptors(BusinessErrorsInterceptor)
export class CultureCountryController {
    constructor(private readonly cultureCountryService: CultureCountryService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':cultureId/countries/:countryId')
    @Roles(Role.ADMIN, Role.WRITE_USER)
    async addCountryCulture(@Param('cultureId') cultureId: string, @Param('countryId') countryId: string) {
        return this.cultureCountryService.addCountryCulture(cultureId, countryId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':cultureId/countries')
    @Roles(Role.ADMIN, Role.USER)
    async findCountriesByCultureId(@Param('cultureId') cultureId: string) {
        return this.cultureCountryService.findCountriesByCultureId(cultureId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':cultureId/countries/:countryId')
    @Roles(Role.ADMIN, Role.USER)
    async findCountryByCultureIdCountryId(@Param('cultureId') cultureId: string,
        @Param('countryId') countryId: string) {
        return this.cultureCountryService.findCountryByCultureIdCountryId(cultureId, countryId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':cultureId/countries')
    @Roles(Role.ADMIN, Role.WRITE_USER)
    async associateCountriesCulture(@Param('cultureId') cultureId: string,
        @Body() countriesDto: CountryDto[]) {
        const countries = plainToInstance(CountryEntity, countriesDto);
        return await this.cultureCountryService.associateCountriesCulture(cultureId, countries);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':cultureId/countries/:countryId')
    @Roles(Role.ADMIN, Role.DELETE_USER)
    @HttpCode(204)
    async deleteCountryCulture(@Param('cultureId') cultureId: string,
        @Param('countryId') countryId: string) {
        return await this.cultureCountryService.deleteCountryCulture(cultureId, countryId);
    }

}
