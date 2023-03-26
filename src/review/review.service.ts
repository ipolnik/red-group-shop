import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { ReviewDto } from './review.dto';
import { returnReviewObject } from './return-review.object';

@Injectable()
export class ReviewService {
    constructor (private prisma: PrismaService){}

     async getAll () {
      return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: returnReviewObject
      })
     }

     async create(userId: number, dto: ReviewDto, productId: number) {
         return this.prisma.review.create({
            data: {
               ...dto,
               product: {
                connect: {
                    id: productId
                }
               },
               user:{
                connect: {
                    id: userId
                }
               }
            }
         })
     }    

     async getAvarageReview(productId: number){
        return this.prisma.review.aggregate({
            where:{ productId },
            _avg: {rating: true}
        }).then(data => data._avg)
     }
}
