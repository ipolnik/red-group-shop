import { Injectable } from '@nestjs/common';
import { OrderController } from 'src/order/order.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    async getMain(userId: number) {
       const user = await this.userService.byId(userId, {
        orders: {
            select: {
                items: {
                    select: {
                        price: true
                    }
                }
            }
        },
        reviews: true
       })

 /*       const totalAmount = await this.prisma.order.aggregate({
        where: {
            userId
               },
       })
*/

       return [
        {name: 'Orders',
         value: user.orders.length
        },
        {name: 'Reviews',
         value: user.reviews.length
        },
        {name: 'Favorites',
         value: user.favorites.length
        },
        {name: 'Total amount',
         value: 1000
        },
       ]
    }

    

}
