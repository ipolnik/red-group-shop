import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/authorization.dto';

@Injectable()
export class AuthorizationService {

   constructor(private prisma :  PrismaService, private jwt: JwtService ){}


   async login(dto : AuthDto){
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

      return {user : this.returnUserFields(user),
         ...tokens
    }

   }

   async getNewTokens(refreshToken : string){
      const result = await this.jwt.verifyAsync(refreshToken)
      if(!result) throw new UnauthorizedException('Invalid refresh token')

      const user = await this.prisma.user.findUnique({
         where: {
            id: result.id
         }
      })

      const tokens = await this.issueTokens(user.id)

      return {user : this.returnUserFields(user),
         ...tokens
    }
   }

   async register(dto : AuthDto){
     const existUser = await this.prisma.user.findUnique({
      where:{
         email: dto.email
      }
     })

     if(existUser) throw new BadRequestException("User already exist")

     const user = await this.prisma.user.create({
        data: {
         email: dto.email,
         name: faker.name.firstName(),
         avatarPath: faker.image.avatar(),
         phone: faker.phone.number('+7 (###) ###-##-##'),
         password: await hash(dto.password)
      }
     })

     const tokens = await this.issueTokens(user.id)
     console.log(tokens);
     return {user : this.returnUserFields(user),
             ...tokens
      }
   }

   private async issueTokens(userId : number){
      const data = {
         id: userId
      }

      const accessToken = this.jwt.sign(data, {
         expiresIn: '10h',
      })

      const refreshToken = this.jwt.sign(data, {
         expiresIn: '1d',
      })


      return {accessToken, refreshToken}
   }

   private returnUserFields (user : User){
     return {
      id: user.id,
      email: user.email
     }
   }

   private async validateUser(dto: AuthDto){
      const user = await this.prisma.user.findUnique({
         where:{
            email: dto.email
         }
        })
        if(!user) throw new NotFoundException("User not  found")

        const isValid = await verify(user.password, dto.password)

        if(!isValid) throw new UnauthorizedException('Invalid password')

        return user;
   }
}