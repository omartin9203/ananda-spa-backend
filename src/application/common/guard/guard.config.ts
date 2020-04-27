import { GoogleStrategy } from './auth/google.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { GqlAuthGuard } from './auth/graphql.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/local.strategy';
import { API_KEY } from '../../../constants/constants';
import { RolesGuard } from './auth/roles.guard';

export const GuardConfig = {
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: API_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    GoogleStrategy, JwtStrategy, GqlAuthGuard, LocalStrategy, RolesGuard,
  ],
  exports: [
    GoogleStrategy, JwtStrategy, GqlAuthGuard, LocalStrategy, RolesGuard,
  ],
};
