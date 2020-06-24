import { Body, Controller, Headers, HttpStatus, Logger, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ReviewService } from '../services/review/review.service';
import { ReviewSettingService } from '../services/settings/review-settings.service';
import { ReviewInput } from '../dtos/inputs/review/review.input';
import { UserService } from '../services/user/user.service';
import { AccreditedInputType } from '../dtos/inputs/review/accredited/accredited.input';
import { ColorSettingService } from '../services/settings/color-setting.service';
import { FeedbackInputType } from '../dtos/inputs/review/feedback/feedback.input';
import { Response } from 'express';
import { API_KEY } from '../../../constants';

@Controller('review')
export class ReviewController {
  constructor(readonly reviewService: ReviewService,
              readonly reviewSettingService: ReviewSettingService,
              readonly colorSettingService: ColorSettingService,
              readonly userService: UserService) {}
  private readonly logger = new Logger(ReviewController.name);
  @Post('feedback')
  async saveFeedbackReview(
    @Headers('token') apiKey,
    @Body() feedback: FeedbackInputType,
    @Res() res: Response,
  ) {
    if (apiKey !== API_KEY) { return new UnauthorizedException(); }
    try {
      const directoryId = (await this.reviewSettingService.getAll(0, 10))
        .items.find(x => x.directoryName.toLocaleLowerCase().startsWith('ananda'))?.id;
      if (directoryId) {
        const colorId = (await this.colorSettingService.findOne({colorId: feedback.facialistId}))?.id;
        const review = {
          client: feedback.clientId,
          date: new Date(),
          text: feedback.extractions,
          stars: feedback.rating,
          directoryId,
        } as ReviewInput;
        if (colorId) {
          const employee = (await this.userService.findOne({colorId}))?.id;
          if (employee) {
            review.accredited = {
              accreditedDate: new Date(),
              accreditedToEmployee: true,
              employeeId: employee,
            } as AccreditedInputType;
          }
        }
        const result = await this.reviewService.createReview(review);
        if (result) {
          return res.status(HttpStatus.OK).json(result);
        }
      }
    } catch (e) {
      this.logger.debug(e);
    }
  }
}
