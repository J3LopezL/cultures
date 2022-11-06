/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { CultureRegionService } from './culture-region.service';
import { RegionEntity } from '../region/region.entity';
import { RegionDto } from '../region/region.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Role } from '../auth/roles.enum';

@Controller('cultures')
@UseInterceptors(BusinessErrorsInterceptor)
export class CultureRegionController {
    constructor(private readonly cultureRegionService: CultureRegionService) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Post(':cultureId/regions/:regionId')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
    async addRegionCulture(@Param('cultureId') cultureId: string, @Param('regionId') regionId: string){
       return await this.cultureRegionService.addRegionCulture(cultureId, regionId);
   }

@UseGuards(JwtAuthGuard, RolesGuard)
@Get(':cultureId/regions/:regionId')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER, Role.USER)
   async finRegionByCultureIdRegionId(@Param('cultureId') cultureId: string, @Param('regionId') regionId: string){
       return await this.cultureRegionService.findRegionByCultureIdRegionId(cultureId, regionId);
   }

@UseGuards(JwtAuthGuard, RolesGuard)
@Get(':cultureId/regions')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER, Role.USER)
   async findRegionsByCultureId(@Param('cultureId') cultureId: string){
       return await this.cultureRegionService.findRegionsByCultureId(cultureId);
   }

@UseGuards(JwtAuthGuard, RolesGuard)
@Put(':cultureId/regions')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
   async associateRegionsCulture(@Body() regionsDto: RegionDto[], @Param('cultureId') cultureId: string){
       const regions = plainToInstance(RegionEntity, regionsDto)
       return await this.cultureRegionService.associateRegionsCulture(cultureId, regions);
   }

@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':cultureId/regions/:regionId')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
@HttpCode(204)
    async deleteRegionCulture(@Param('cultureId') cultureId: string, @Param('regionId') regionId: string){
        return await this.cultureRegionService.deleteRegionCulture(cultureId, regionId);
    }
}
