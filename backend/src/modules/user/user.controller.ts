import { Controller, Post, Body, Param, Get, Delete, Res, HttpStatus, Req, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express'; 
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  @Post('/register')
  async register(
    @Body() body: { password: string; email: string },
    @Res({ passthrough: true }) res: Response
  ) {

    const { token } = await this.userService.register(body.password, body.email);
    
    console.log('user  controller setting cookie for token : ' + token)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    return { 
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully' 
    };

  
  }

  @Post('/login')
  async login(
    @Body() body: { password: string; email: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const { token } = await this.userService.login(body.password, body.email);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 12 * 60 * 60 * 1000 // 12 hours
      });
  
      return { 
        statusCode: HttpStatus.CREATED,
        message: 'User logged in successfully' 
      };

  }

  @Get('check-auth')
  checkAuth(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.token;
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    if (!token || !JWT_SECRET) {
      return res.json({ authenticated: false });
    }

    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });

      if(payload){
        return res.json({ authenticated: true });
      }
      else{
        throw new Error('token invalid ')
      }

    } catch(e: any) {
      console.error('check-auth error: ' +  e.message)
      return res.json({ authenticated: false });
    }
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {

    try {
      res.clearCookie('token');
      return res.json({ 
        statusCode: HttpStatus.ACCEPTED,
        message: 'User logged out successfully' 
      });

    } catch(e: any) {
      console.error('logout error: ' +  e.message)
      return res.json({ authenticated: false });
    }
  }


}
