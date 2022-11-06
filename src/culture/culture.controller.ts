/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CultureDto } from './culture.dto';
import { CultureEntity } from './culture.entity';
import { CultureService } from './culture.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';


@Controller('cultures')
@UseInterceptors(BusinessErrorsInterceptor)
export class CultureController {constructor(private readonly cultureService: CultureService) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Get()
@Roles(Role.ADMIN, Role.CULTURE_USER)
async findAll() {
  return await this.cultureService.findAll();
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Get(':cultureId')
@Roles(Role.ADMIN, Role.CULTURE_USER, Role.USER)
async findOne(@Param('cultureId') cultureId: string) {
  return await this.cultureService.findOne(cultureId);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Post()
@Roles(Role.ADMIN, Role.CULTURE_USER)
async create(@Body() cultureDto: CultureDto) {
  const culture: CultureEntity = plainToInstance(CultureEntity, cultureDto);
  return await this.cultureService.create(culture);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Put(':cultureId')
@Roles(Role.ADMIN, Role.CULTURE_USER)
async update(@Param('cultureId') cultureId: string, @Body() cultureDto: CultureDto) {
  const culture: CultureEntity = plainToInstance(CultureEntity, cultureDto);
  return await this.cultureService.update(cultureId, culture);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':cultureId')
@Roles(Role.ADMIN, Role.CULTURE_USER)
@HttpCode(204)
async delete(@Param('cultureId') cultureId: string) {
  return await this.cultureService.delete(cultureId);
}
}
