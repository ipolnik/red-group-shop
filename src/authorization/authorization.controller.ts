import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthDto } from './dto/authorization.dto';
import { AuthorizationService } from './authorization.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
    async register(@Body() dto : AuthDto){
      return this.authorizationService.register(dto)
    }

    @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
    async login(@Body() dto : AuthDto){
      return this.authorizationService.login(dto)
    }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('login/access-token')
    async getNewToken(@Body() dto : RefreshTokenDto){
      return this.authorizationService.getNewTokens(dto.refreshToken)
    }
}
