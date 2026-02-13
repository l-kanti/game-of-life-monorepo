import { Body, Controller, Get, Post, UseGuards, HttpException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '../guards/auth/auth.guard';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../guards/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../../../shared/dto/logindto';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService,
              private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    if (loginDto.username == undefined || !loginDto.password == undefined ) {
      throw new BadRequestException;
    }
    
    const user = await this.authService.validateUser(loginDto);
    
    const token = this.authService.sign(user.username, user.id);
    
    return { access_token: token };  
  }

  @Post("register")
  async createUser(@Body() loginDto: LoginDto) {
    if (loginDto.username == undefined || !loginDto.password == undefined ) {
      throw new BadRequestException;
    }
    try {
      this.authService.createUser(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Get("board")
  @UseGuards(AuthGuard)
  async getData(@Body() requestBody: any) {
    try {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:50051/api/board', requestBody)
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

  @Post("board")
  @UseGuards(AuthGuard)
  async postData(@Body() requestBody: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:50051/api/board', requestBody)
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

  @Get("replays/board")
  @UseGuards(AuthGuard)
  async getReplayData(@Body() requestBody: any) {
    try {
      const response = await firstValueFrom(
      this.httpService.get('http://localhost:50051/api/replays/board', requestBody)
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
