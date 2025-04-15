import { ConflictException, Injectable, InternalServerErrorException,
  UnprocessableEntityException,UnauthorizedException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/entities/user.entity';
import { URL } from '../database/entities/url.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService, 
    private readonly jwtService: JwtService 
  ) {}


  async login(password: string, email: string): Promise<{ token: string }> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET'); 

    if(!JWT_SECRET){
      throw new InternalServerErrorException(
        'JWT_SECRET missing.'
      );
    }

      const user = await this.userRepository.findOne({
        where: { email: email }
      });

      if (!user) {
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Invalid Credentials.',
        });
      }

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new UnauthorizedException({
            statusCode: 401,
            message: 'Invalid Credentials.',
          });
        }

        const token = this.jwtService.sign({ userId: user.id, email });

        return { token };

      } catch(error){
      console.error('login error:', error);  
      throw new InternalServerErrorException(
        'login failed. Please try again later.'
      );
      }

  }

  async register(password: string, email: string): Promise<{ token: string }> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET'); // 

    if(!JWT_SECRET){
      throw new InternalServerErrorException(
        'JWT_SECRET missing.'
      );
    }

      const existingUser = await this.userRepository.findOne({
        where: { email: email }
      });

      if (existingUser) {
        throw new ConflictException({
          statusCode: 409,
          message: 'User already exists, please log in.',
        });
      }

      try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({ 
          password: hashedPassword, 
          email 
        });
        
        const { id } = await this.userRepository.save(user);
        if (!id) {
          throw new UnprocessableEntityException('Failed to create user');
        }

        const token = this.jwtService.sign({ userId: id, email });

        return { token };

      } catch(error){
      console.error('Registration error:', error);  
      throw new InternalServerErrorException(
        'Registration failed. Please try again later.'
      );
      }

  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

} 