import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { NewPruductDTO } from './products.dto'
import { Product } from './product.model'


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {
    }
    @Post()
    async insertProduct(@Body() newProduct: NewPruductDTO) {
        const generatedId = await this.productsService.insertProduct(newProduct)
        return { generatedId }
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getAllProducts()
        return products
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodId: string): any {
        return this.productsService.getSingleProduct(prodId)

    }

    @Patch(':id')
    updateProduct(@Param('id') productId: string, @Body() product: NewPruductDTO): any {
        return this.productsService.updateProduct(product, productId)
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string): any {
        return this.productsService.deleteProduct(productId)
    }
}
