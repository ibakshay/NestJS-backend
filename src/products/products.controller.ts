import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { NewPruductDTO } from './products.dto'


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {
    }
    @Post()
    insertProduct(@Body() newProduct: NewPruductDTO): any {
        return this.productsService.insertProduct(newProduct)
    }

    @Get()
    getAllProducts(): any {
        return { data: this.productsService.getAllProducts() }
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
