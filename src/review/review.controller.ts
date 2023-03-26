import { Body, Controller, Get, HttpCode, Param, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/authorization/decorators/auth.decorator';
import { CurrentUser } from 'src/authorization/decorators/user.decorator';
import { ReviewDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(){
    return this.reviewService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth()
  async leaveReview(@CurrentUser('id') id: number,@Body() dto: ReviewDto, @Param('productId') productId: string
  ) {
    return this.reviewService.create(id, dto, +productId)
  }

}
