import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';

import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { EnumProductSort, GetAllProductsDto } from './dto/get-all.products.dto';
import { ProductDto } from './product.dto';
import { productReturnObject, productReturnObjectFullest } from './return-product.object';

@Injectable()
export class ProductService {
    constructor(private prisma : PrismaService, private paginationService : PaginationService) {}

    async getAll (dto: GetAllProductsDto = {}) {
          const {sort, searchTerm} = dto

          const prismaSort : Prisma.ProductOrderByWithRelationInput[] = []
          if(sort ===  EnumProductSort.LOW_PRICE) {
            prismaSort.push({price: 'asc'})
          } else if (sort === EnumProductSort.HIGH_PRICE) {
            prismaSort.push({price: 'desc'})
          } else if (sort === EnumProductSort.OLDEST) {
            prismaSort.push({createdAt : 'asc'})
          } else { 
            prismaSort.push({createdAt: 'desc'})
          }
           
          const prismaSearchTermFilter: Prisma.ProductWhereInput =
           searchTerm ? {
             OR: [
                {category: {
                   name: {
                      contains: searchTerm,
                      mode: 'insensitive'
                   }
                  }
                 },
                { name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
                 },
                 {
                 description: {
                  contains: searchTerm,
                  mode: 'insensitive'
                 }
                }
             ]
          } : {}

          const {perPage, skip} = this.paginationService.getPagination(dto)

          const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage
          })

          return {
            products,
            length: await this.prisma.product.count({
               where: prismaSearchTermFilter
            })
          }
     }

   
      async byId(id : number){
        const product = await this.prisma.product.findUnique({
           where: {
            id
        },
         select: productReturnObjectFullest
      })
  
     if(!product) {throw new NotFoundException('Productproduct not found')}
  
     return product
    }

     async bySlug(slug : string){
      const product = await this.prisma.product.findUnique({
         where: {
          slug
      },
       select: productReturnObjectFullest
    })

   if(!product) {throw Error('Productproduct not found')}

   return product
   }

   async byCategory(categorySlug : string){
    const product = await this.prisma.product.findMany({
       where: {
        category: {
            slug: categorySlug
        }
    },
     select: productReturnObjectFullest
  })

 if(!product) {throw Error('Productproduct not found')}

 return product
 }

 async getSimilar(id : number){
    const currentProduct = await this.byId(id)

    if(!currentProduct)
    throw new NotFoundException('Product not fount!')

    const product = await this.prisma.product.findMany({
       where: {
       category: {
        name: currentProduct.category.name
       },
       NOT: {
        id: currentProduct.id
       }
    },
    orderBy:{
        createdAt: 'desc'
    },
     select: productReturnObject
  })

 if(!product) {throw Error('Productproduct not found')}

 return product
 }

     async create() {
         const product  = await this.prisma.product.create({
            data: {
                description: '',
               name: '',
               price: 0,
               slug: ''
            }
         })
         return product.id
     }
     
     async update(id: number, dto: ProductDto){

        const {description, image, price, name, categoryId} = dto
  
        return this.prisma.product.update({
           where:{
              id
           },
           data:{
            description,
            image,
            price,
            name: dto.name,
            slug: generateSlug(name),
            category: {
                connect: {
                    id: categoryId
                }
            }
           }
        })
     }

     async delete(id: number){
  
      return this.prisma.product.delete({
         where:{
            id
         }
      })
   }
}
