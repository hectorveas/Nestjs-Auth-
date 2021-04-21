import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/products.dto';
import { IProduct } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly productsModel: Model<IProduct>,
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct> {
    const newProduct = new this.productsModel(createProductDTO);
    return newProduct.save();
  }

  async getProducts(): Promise<IProduct[]> {
    const products = await this.productsModel.find();
    return products;
  }

  async getProduct(id: string): Promise<IProduct> {
    const product = await this.productsModel.findById(id);
    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    const product = await this.productsModel.findByIdAndDelete(id);
    return product;
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<IProduct> {
    const updatedIProduct = await this.productsModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true },
    );
    return updatedIProduct;
  }
}
