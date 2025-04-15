import { Injectable, NestMiddleware, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {

    const token = req.cookies?.token;
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    if (!JWT_SECRET) {
      console.error('AuthMiddleware: JWT_SECRET missing');
      throw new InternalServerErrorException('JWT_SECRET missing');
    }

    if (!token) {
      console.error('AuthMiddleware: No token provided');
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });
      req.user = payload; 
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}