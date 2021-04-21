import {
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productsService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProducts(@Res() res) {
    const products = await this.productsService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const product = await this.productsService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteProduct(@Res() res, @Query('id') id) {
    const product = await this.productsService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      product,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('id') id,
  ) {
    const product = await this.productsService.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      product,
    });
  }
}
