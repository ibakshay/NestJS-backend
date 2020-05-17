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
    async getSingleProduct(@Param('id') prodId: string): Promise<any> {
        const result = await this.productsService.getSingleProduct(prodId)
        return { data: result }

    }

    @Patch(':id')
    async updateProduct(@Param('id') productId: string, @Body() product: NewPruductDTO): Promise<any> {
        const response = await this.productsService.updateProduct(product, productId)
        return response
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string): Promise<any> {
        const response = await this.productsService.deleteProduct(productId)
        return response
    }
}
