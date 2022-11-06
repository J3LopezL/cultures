"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultureResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const culture_service_1 = require("./culture.service");
const culture_entity_1 = require("./culture.entity");
const culture_dto_1 = require("./culture.dto");
let CultureResolver = class CultureResolver {
    constructor(cultureService) {
        this.cultureService = cultureService;
    }
    cultures() {
        return this.cultureService.findAll();
    }
    culture(id) {
        return this.cultureService.findOne(id);
    }
    createCulture(cultureDto) {
        const culture = (0, class_transformer_1.plainToInstance)(culture_entity_1.CultureEntity, cultureDto);
        return this.cultureService.create(culture);
    }
    updateCulture(id, cultureDto) {
        const culture = (0, class_transformer_1.plainToInstance)(culture_entity_1.CultureEntity, cultureDto);
        return this.cultureService.update(id, culture);
    }
    deleteCulture(id) {
        this.cultureService.delete(id);
        return id;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [culture_entity_1.CultureEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultureResolver.prototype, "cultures", null);
__decorate([
    (0, graphql_1.Query)(() => culture_entity_1.CultureEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultureResolver.prototype, "culture", null);
__decorate([
    (0, graphql_1.Mutation)(() => culture_entity_1.CultureEntity),
    __param(0, (0, graphql_1.Args)('culture')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [culture_dto_1.CultureDto]),
    __metadata("design:returntype", Promise)
], CultureResolver.prototype, "createCulture", null);
__decorate([
    (0, graphql_1.Mutation)(() => culture_entity_1.CultureEntity),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('culture')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, culture_dto_1.CultureDto]),
    __metadata("design:returntype", Promise)
], CultureResolver.prototype, "updateCulture", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CultureResolver.prototype, "deleteCulture", null);
CultureResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [culture_service_1.CultureService])
], CultureResolver);
exports.CultureResolver = CultureResolver;
//# sourceMappingURL=culture.resolver.js.map