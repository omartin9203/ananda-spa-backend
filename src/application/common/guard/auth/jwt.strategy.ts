import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { API_KEY } from '../../../../constants';
import { AuthService } from '../../services/auth/auth.service';
import { IPayloadAuth } from '../../dtos/dtos/auth/payload.dto';
import { IUserAuhtenticated } from '../../../core/interfaces/auth/user-autenticated.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: API_KEY,
        });
    }
    async validate(payload: IPayloadAuth): Promise<IUserAuhtenticated> {
        const userId = payload.sub;
        return await this.authService.getRoles(userId)
            .then(res => {
                return {
                    ...payload,
                    id: userId,
                    roles: res,
                };
            })
            .catch(err => {
                throw new UnauthorizedException('Unauthorized', err.message);
            });
    }

}
