import { AccreditedType } from "../../dtos/dtos/review/review.dto";
import { UserInfoDto } from "../../dtos/dtos/user/user.Info.dto";
import { ResolveProperty, Resolver, Parent } from "@nestjs/graphql";
import { UserService } from "../../services/user/user.service";

@Resolver(of => AccreditedType)
export class AccreditedResolver {
    constructor(
        private readonly userService: UserService,
    ) { }
    @ResolveProperty(returns => UserInfoDto)
    async manager(@Parent() accredited) {
        const { managerId } = accredited;
        let user;
        try {
            user = await this.userService.getUserInfo(managerId);
        } catch (e) {
            return null;
        }
        return user;
    }
    @ResolveProperty(returns => UserInfoDto)
    async employee(@Parent() accredited) {
        const { employeeId } = accredited;
        let user;
        try {
            user = await this.userService.getUserInfo(employeeId);
        } catch (e) {
            return null;
        }
        return user;
    }
}