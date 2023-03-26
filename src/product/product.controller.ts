import { Controller } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/authorization/decorators/auth.decorator';
import { GetAllProductsDto } from './dto/get-all.products.dto';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductsDto){
    return this.productService.getAll(queryDto)
  }

  @Get(':id')
  async byId(@Param('id') id: string){
    return this.productService.byId(+id)
  }

  @Get('similar/:id')
  async get(@Param('id') id: string){
    return this.productService.getSimilar(+id)
  }

  @Get("by-slug/:slug")
  async getProductBySlug(@Param('slug') slug : string){
    return this.productService.bySlug(slug)
  }

  @Get("by-category/:categorySlug")
  async getProductByCategory(@Param('categorySlug') categorySlug : string){
    return this.productService.byCategory(categorySlug)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct(){
    return this.productService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateProduct(@Param('id') id : string, @Body() dto: ProductDto){

    console.log("object$$$$$", id, "********", dto);
    return this.productService.update(+id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteProduct(@Param('id') id : string){
    return this.productService.delete(+id)
  }
}
