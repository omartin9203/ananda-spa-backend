import { ClientResolver } from './client.resolver';
import { UserResolver } from './user.resolver';
import { BaseFormResolver } from './form/base-form.resolver';
import { FacialFormResolver } from './form/facial-form.resolver';
import { MassageFormResolver } from './form/massage-form.resolver';
import { DiagnosticResolver } from './diagnostic.resolver';
import { VisitResolver } from './visit.resolver';
import { AuthResolver } from './auth/auth.resolver';

export const ResolversConfig = {
  imports: [
  ],
  providers: [
    ClientResolver, UserResolver, BaseFormResolver, FacialFormResolver, MassageFormResolver, DiagnosticResolver, VisitResolver, AuthResolver,
  ],
  exports: [
    ClientResolver, UserResolver, BaseFormResolver, FacialFormResolver, MassageFormResolver, DiagnosticResolver, VisitResolver, AuthResolver,
  ],
};
