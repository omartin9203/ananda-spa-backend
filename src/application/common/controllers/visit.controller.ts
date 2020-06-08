import { Body, Controller, Get, Headers, NotImplementedException, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { VisitRetentionService } from '../services/visit/visitRetention.service';
import { VisitRetentionInput } from '../dtos/inputs/visitRetention/visitRetention.input';
import { UserService } from '../services/user/user.service';
import { UserDto } from '../dtos/dtos/user/user.dto';
import { API_KEY } from '../../../constants/constants';
import { FLAG_RETENTION } from '../../../constants/modules/enums';

@Controller('visit')
export class VisitsController {
    constructor(readonly visitRetentionService: VisitRetentionService, readonly userService: UserService) { }

    @Post('retention')
    async saveVisitRetention(
        @Headers('token') apiKey,
        @Body() input: VisitRetentionInput,
        @Req() req: any,
    ) {
        if (apiKey !== API_KEY) throw new UnauthorizedException('Unauthorized')
        const { id }: UserDto = await this.userService.findOne({
            email: input.user,
        });
        await this.userService.updateRetention(id, { total: 1, important: input.flag && input.flag != FLAG_RETENTION.NORMAL ? 1 : 0 })
        return await this.visitRetentionService.createResource({
            userId: id,
            treatment: input.treatment,
            clientPhone: input.client,
            flag: input.flag,
        });
    }

    @Get('retention/parser')
    async parser(@Query('text') text: string) {
        const result = await this.visitRetentionService.parser(text);
        if (!result) { return new NotImplementedException('No exist setting'); }
        return result;
    }
}
