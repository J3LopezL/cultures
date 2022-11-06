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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const culture_entity_1 = require("../culture/culture.entity");
let RecipeEntity = class RecipeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RecipeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "photoDish", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "partions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "videoURL", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => culture_entity_1.CultureEntity, (culture) => culture.recipes),
    __metadata("design:type", culture_entity_1.CultureEntity)
], RecipeEntity.prototype, "cultures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.recipes),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "products", void 0);
RecipeEntity = __decorate([
    (0, typeorm_1.Entity)()
], RecipeEntity);
exports.RecipeEntity = RecipeEntity;
//# sourceMappingURL=recipe.entity.js.map