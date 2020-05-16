import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'
import { NewPruductDTO } from './products.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

    }

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

    async getAllProducts() {
        const response = await this.productModel.find().exec()
        const transformedResponse = response.map((product) => {
            return {
                title: product.title,
                description: product.description,
                price: product.price
            }
        })
        return transformedResponse
    }

    async insertProduct(product: NewPruductDTO) {
        const newProduct = new this.productModel({ title: product.title, description: product.description, price: product.price })
        const result = await newProduct.save()
        return result._id as string
    }

    deleteProduct(productId: string): any {
        const index = this.findProduct(productId)[1]
        this.products.splice(index, 1)
    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.title === productId)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        return [product, productIndex]
    }
}
