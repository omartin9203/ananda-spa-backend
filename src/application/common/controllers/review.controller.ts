import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { ReviewService } from '../services/review/review.service';
import { ReviewSettingService } from '../services/settings/review-settings.service';
import { DIRECTORY_NAME } from '../../../constants/constants';
import { ReviewInput } from '../dtos/inputs/review/review.input';
import { UserService } from '../services/user/user.service';
import { AccreditedInputType } from '../dtos/inputs/review/accredited/accredited.input';
import { ColorSettingService } from '../services/settings/color-setting.service';
import { UserDto } from '../dtos/dtos/user/user.dto';

@Controller('review')
export class ReviewController {
  constructor(readonly reviewService: ReviewService,
              readonly reviewSettingService: ReviewSettingService,
              readonly colorSettingService: ColorSettingService,
              readonly userService: UserService) {}
  private readonly logger = new Logger(ReviewController.name);
  @Post('feedback')
  async saveFeedbackReview(
    @Body() feedback: any,
    @Req() req: any,
  ) {
    try {
      const directoryId = (await this.reviewSettingService.getAll(0, 10))
        .items.find(x => x.directoryName.toUpperCase() === DIRECTORY_NAME.ANANDASPA).id;
      const colorId = (await this.colorSettingService.findOne({colorId: feedback.body.facialistId})).id || undefined;
      const review = {
        client: feedback.body.clientId,
        date: new Date(),
        text: feedback.body.extractions,
        stars: feedback.body.rating,
        directoryId,
      } as ReviewInput;
      const res = await this.reviewService.createReview(review);
      if (colorId) {
        const employee = (await this.userService.findOne({colorId})).id || undefined;
        if (employee) {
          const accredited = {
            accreditedDate: new Date(),
            accreditedToEmployee: true,
            employeeId: employee,
          } as AccreditedInputType;
          await this.reviewService.accreditReview(res.id, accredited);
        }
      }
    } catch (e) {
      this.logger.debug(e);
    }
  }
}
