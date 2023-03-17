import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/authorization/decorators/auth.decorator';
import { CurrentUser } from 'src/authorization/decorators/user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  authorizationService: any;
  constructor(private readonly userService: UserService) {}
  
  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number){
    return this.userService.byId(id)
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async getNewToken(@CurrentUser('id') id: number, @Body() dto: UserDto){
      return this.userService.updateProfile(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
    async toggleFavorite( @CurrentUser('id') id : number, @Param('productId') productId: string){
     return this.userService.toggleFavorites(id, +productId)
    }

}
