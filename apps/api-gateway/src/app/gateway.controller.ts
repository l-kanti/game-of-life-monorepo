import { Body, Controller, Get, Post, UseGuards, Request, HttpException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '../guards/auth/auth.guard';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../guards/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../../../shared/dto/logindto';
import { CreateBoardDto, GetBoardsDto, GetReplayDto } from '../../../shared/dto/board.dto';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService,
              private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password) {
      throw new HttpException('Missing one or more required values', 400);    
    }

    const user = await this.authService.validateUser(loginDto);
    
    const token = this.authService.sign(user.username, user.id); 
    
    return { access_token: token };  
  }

  @Post("register")
  async createUser(@Body() loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password) {
      throw new HttpException('Missing one or more required values', 400);    
    }
    try {
      this.authService.createUser(loginDto);
      return { response: 'Account successfully created ^_^'}
    } catch (error) {
      throw error;
    }
  }

  @Post("boards")
  @UseGuards(AuthGuard)
  async getData(@Request() req, @Body() requestBody: GetBoardsDto) {
    try {
      // fetch user_id from req containing JWT
    const user_id = req.decodedData.sub;
    requestBody.userId = user_id;
    console.log("USER ID: " + user_id);
    const response = await firstValueFrom(
      this.httpService.post('http://board-request-service:50051/api/boards', requestBody)
    );
    return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data,
          error.response.status
        );
      }
      throw error;
    }
  }

  @Post("boards/retrieve")
  @UseGuards(AuthGuard)
  async postData(@Request() req, @Body() requestBody: CreateBoardDto) {
    try {
      const user_id = req.decodedData.sub;
      requestBody.userId = user_id
      const response = await firstValueFrom(
        this.httpService.post('http://board-request-service:50051/api/boards/retrieve', requestBody)
      );
      return response.data;
    } catch (error) {
        if (error.response) {
          throw new HttpException(
            error.response.data,
            error.response.status
          );
        }
        throw error;
    }
  }

  @Post("replays/boards/retrieve")
  @UseGuards(AuthGuard)
  async getReplayData(@Request() req, @Body() requestBody: GetReplayDto) {
    try {
      const user_id = req.decodedData.sub;
      requestBody.userId = user_id
      const response = await firstValueFrom(
      this.httpService.post('http://localhost:50051/api/replays/boards', requestBody)
    );
    return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data,
          error.response.status
        );
      }
      throw error;
    }
  }
}
