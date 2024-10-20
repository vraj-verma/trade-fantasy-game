import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Response } from 'express';
import { MatchDTO } from './dto/match.dto';
import { ValidationPipe } from '../pipes/joi.pipe';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { SuccessResponse } from '../types/success-response.type';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationSchema } from '../validations/schema.validation';

@ApiTags('Match Controller')
@UseGuards(JwtAuthGuard)
@Controller('matches')
export class MatchesController {

  constructor(
    private readonly matchesService: MatchesService
  ) { }


  @ApiOperation({ summary: 'Create a match' })
  @ApiResponse({ type: SuccessResponse })
  @Post()
  async createMatch(
    @Res() res: Response,
    @Body(new ValidationPipe(JoiValidationSchema.matchSchema)) payload: MatchDTO
  ) {

    const response = await this.matchesService.createMatch(payload);

    if (!response) {
      throw new HttpException(
        `Failed to create match`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    res.status(201).json({
      message: `Match created successfully with id: ${response}`,
      status: true
    });

  }
}
