import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'
import { NewPruductDTO } from './products.dto'

@Injectable()
export class ProductsService {

    private products: Product[] = []

    updateProduct(product: NewPruductDTO, produdctId: string): any {
        const [existingProduct, index] = this.findProduct(produdctId)
        const updatedProduct = { ...existingProduct }
        if (product.title) {
            updatedProduct.title = product.title
        }
        if (product.description) {
            updatedProduct.description = product.description
        }
        if (product.price) {
            updatedProduct.price = product.price
        }
        this.products[index] = updatedProduct



    }

    getSingleProduct(productId: string): any {
        const product = this.findProduct(productId)[0]

        return { ...product }

    }

    getAllProducts(): any {
        console.log(this.products)
        return [...this.products]
    }

    insertProduct(product: NewPruductDTO): string {
        const newProductId = Math.random().toString()
        const newProduct = new Product(newProductId, product.title, product.description, product.price)
        this.products.push(newProduct)
        return newProductId
    }

    deleteProduct(productId: string): any {
        const index = this.findProduct(productId)[1]
        this.products.splice(index, 1)
    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id === productId)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        return [product, productIndex]
    }
}
