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

    async updateProduct(product: NewPruductDTO, productId: string): Promise<Product> {
        // const [existingProduct, index] = this.findProduct(produdctId)
        const updatedProduct = await this.fetchProduct(productId)
        if (product.title) {
            updatedProduct.title = product.title
        }
        if (product.description) {
            updatedProduct.description = product.description
        }
        if (product.price) {
            updatedProduct.price = product.price
        }

        updatedProduct.save()
        return updatedProduct

    }

    async getSingleProduct(productId: string): Promise<Product> {
        const product = await this.fetchProduct(productId)
        return product as Product

    }

    async getAllProducts() {
        const response = await this.productModel.find().exec()
        const transformedResponse = response.map((product) => {
            return {
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
            }
        })
        return transformedResponse
    }

    async insertProduct(product: NewPruductDTO) {
        const newProduct = new this.productModel({ title: product.title, description: product.description, price: product.price })
        const result = await newProduct.save()
        return result._id as string
    }

    async deleteProduct(productId: string): Promise<any> {
        const product = await this.productModel.deleteOne({ _id: productId })
        return "deleted"
        //this.products.splice(index, 1)
    }

    private findProduct(productId: string): [Product, number] {
        //const productIndex = this.products.findIndex(product => product.id === productId)
        const productIndex = this.products.findIndex(product => product.title === productId)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        return [product, productIndex]
    }
    private async fetchProduct(productId: string): Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(productId)
        } catch (error) {

            throw new NotFoundException('product not found')
        }
        return product
    }
}
