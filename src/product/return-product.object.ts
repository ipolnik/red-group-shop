import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "src/category/return-category.object";
import { returnReviewObject } from "src/review/return-review.object";




export const productReturnObject: Prisma.ProductSelect = {
   image: true,
   description: true,
   id: true,
   name: true,
   price: true,
   createdAt: true,
   slug: true
}

export const productReturnObjectFullest : Prisma.
    ProductSelect = {
        ...productReturnObject,
    reviews: {
        select: returnReviewObject
    },
    category: {select: returnCategoryObject}
}