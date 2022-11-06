/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param,
    Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CountryDto } from './country.dto';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { Role } from '../auth/roles.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('countries')
@UseInterceptors(BusinessErrorsInterceptor)
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.ADMIN, Role.USER)
    async findAll() {
        return await this.countryService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':countryId')
    @Roles(Role.ADMIN, Role.USER)
    async findOne(@Param('countryId') countryId: string) {
        return await this.countryService.findOne(countryId);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles(Role.ADMIN, Role.WRITE_USER)
    async create(@Body() countryDto: CountryDto) {
        const country: CountryEntity = plainToInstance(CountryEntity, countryDto);
        return await this.countryService.create(country);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':countryId')
    @Roles(Role.ADMIN, Role.WRITE_USER)
    async update(@Param('countryId') countryId: string, @Body() countryDto: CountryDto) {
        const country: CountryEntity = plainToInstance(CountryEntity, countryDto);
        return await this.countryService.update(countryId, country);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':countryId')
    @Roles(Role.ADMIN, Role.DELETE_USER)
    @HttpCode(204)
    async delete(@Param('countryId') countryId: string) {
        return await this.countryService.delete(countryId);
    }

}
