import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RegionDto } from './region.dto';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Role } from '../auth/roles.enum';

@Controller('regions')
@UseInterceptors(BusinessErrorsInterceptor)
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER, Role.USER)
  async findAll() {
    return await this.regionService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':regionId')
  @Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER, Role.USER)
  async findOne(@Param('regionId') regionId: string) {
    return await this.regionService.findOne(regionId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
  async create(@Body() regionDto: RegionDto) {
    const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
    return await this.regionService.create(region);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':regionId')
  @Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
  async update(
    @Param('regionId') regionId: string,
    @Body() regionDto: RegionDto,
  ) {
    const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
    return await this.regionService.update(regionId, region);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':regionId')
  @Roles(Role.ADMIN, Role.CULTURE_USER, Role.REGION_USER)
  @HttpCode(204)
  async delete(@Param('regionId') regionId: string) {
    return await this.regionService.delete(regionId);
  }
}
