import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/constants/messages';
import { ConstantCodes } from 'src/constants/constant-codes';
import { ValidationService } from '../common/validation/validation.service';

@Injectable()
export class AuthService {
    constructor(
        public prisma: PrismaService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly validationService: ValidationService
    ) { }

    // user login and generate token
    async login(username: string, password: string) {

        //validate null
        this.validationService.validateRequired(username, messages.USERNAME_NULL);
        // Find the user by username
        const user = await this.prisma.users.findFirst({ where: { username } });
        if (!user) {
            return messages.USER_NOT_FOUND;
        }
        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return messages.PASSWORD_INCORRECT;

        // generate Active toke valid for 1 day and refresh token valid for 7 days
        const { bearerToken, bearerRefreshToken } = await this.generateToken(username, ConstantCodes.TOKEN_NOT_ACTIVE);

        return { bearerToken, bearerRefreshToken };
    }
    // verify token
    async verify(token: string, sercretCode: string) {
        const tokenWithoutBearer = token.replace('Bearer ', '');

        try {
            if (sercretCode == ConstantCodes.TOKEN_CODE) {
                const payload = await this.jwtService.verifyAsync(tokenWithoutBearer,
                    { secret: this.configService.get<string>(ConstantCodes.JWT_SECRET_KEY) });
                return payload;
            } else if (sercretCode == ConstantCodes.REFRESH_TOKEN_CODE) {
                const payload = await this.jwtService.verifyAsync(tokenWithoutBearer,
                    { secret: this.configService.get<string>(ConstantCodes.JWT_REFRESH_SECRET_KEY) });
                return payload;
            }else return messages.TOKEN_VERIFICATION_FAILED;
        } catch (error) {
            switch (error.name) {
                case ConstantCodes.TOKEN_INVALID:
                    return messages.TOKEN_INVALID;
                case ConstantCodes.TOKEN_EXPIRED:
                    return messages.TOKEN_EXPIRED;
                case ConstantCodes.TOKEN_NOT_ACTIVE:
                    return messages.TOKEN_NOT_ACTIVE;
                default:
                    return messages.TOKEN_VERIFICATION_FAILED;
            }
        }
    }

    // generate a new token && refresh token
    async generateToken(username: string, status: string) {

        // Access token will expire in 1 day
        const token = await this.jwtService.signAsync({ data: { username, status } },
            { algorithm: 'HS256', expiresIn: '1d', secret: this.configService.get<string>(ConstantCodes.JWT_SECRET_KEY) });

        // Refresh token will expire in 7 days
        const refresh_token = await this.jwtService.signAsync({ data: { username, status: ConstantCodes.TOKEN_EXPIRED } },
            { algorithm: 'HS256', expiresIn: '7d', secret: this.configService.get<string>(ConstantCodes.JWT_REFRESH_SECRET_KEY) });

        const bearerToken = 'Bearer ' + token
        const bearerRefreshToken = 'Bearer ' + refresh_token

        return { bearerToken, bearerRefreshToken };
    }

    //check if the token is valid and refresh it if needed
    async refreshToken(username: string, refreshToken: string) {

        //validate null
        this.validationService.validateRequired(username, messages.USERNAME_NULL);
        this.validationService.validateRequired(refreshToken, messages.TOKEN_MISSING);
        
        //verify the refresh token
        const payload  = await this.verify(refreshToken, ConstantCodes.REFRESH_TOKEN_CODE);

        //refresh token is expired
        if (!payload) {
            return messages.TOKEN_VERIFICATION_FAILED;
        }

        //generate a new token and refresh token
        const { bearerToken, bearerRefreshToken } = await this.generateToken(username, ConstantCodes.TOKEN_NOT_ACTIVE);

        return { bearerToken, bearerRefreshToken };
    }

}
