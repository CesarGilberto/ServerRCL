import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private ModuleRef:ModuleRef
    ) {}
}
