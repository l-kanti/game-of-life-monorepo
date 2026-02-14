import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../shared/entities/user.entity';
import { LoginDto } from 'apps/shared/dto/logindto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtServ: JwtService,
        @InjectRepository(User) private repository: Repository<User>
    ) {}

    validateToken(token: string) {
        console.log("TOKEN: " + token);
        console.log("KEY: " + process.env.JWT_SECRET_KEY);
        return this.jwtServ.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        });
    }

    sign(username: string, id: number) {
        const payload = {
            sub: id,
            username: username
        }
        return this.jwtServ.sign(payload, {
            secret : process.env.JWT_SECRET_KEY
        })
    }

    async createUser(request: LoginDto) {
        const hashedPassword = await argon2.hash(request.password);
        await this.repository.save({
            username: request.username,
            password: hashedPassword
        });
    }
    

    async validateUser(request: LoginDto) {
        const user = await this.repository.findOne({ where: { username: request.username }});

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const isPasswordValid = await argon2.verify(
            user.password,
            request.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');          
        }

        return user;
    }
}

