import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDto) {
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firstName: '',
          lastName: '',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('Error in credentials');
      }
      return {
        error: error,
      };
    }
  }

  async login(authDTO: AuthDto) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });

    if (!existUser) {
      throw new ForbiddenException('Invalid username or password');
    }

    const isValidPassword = await argon.verify(
      existUser.hashedPassword,
      authDTO.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Invalid username or password');
    }

    return this.signJwtToken(existUser.id, existUser.email);
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken,
    };
  }
}
