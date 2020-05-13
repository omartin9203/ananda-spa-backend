import { AccreditedType, ReviewDto } from '../../dtos/dtos/review/review.dto';
import { Injectable, NotAcceptableException, Logger } from '@nestjs/common';
import { ReviewRepository } from '../../../../infrastructure/common/repositories/review.repository';
import { ResourceService } from '../../../core/services/resource.service';
import { ReviewSettingService } from '../settings/review-settings.service';
import { ReviewInput } from '../../dtos/inputs/review/review.input';
import { AccreditedUpdate } from '../../dtos/inputs/review/accredited/accredited.update';
import { AccreditedInputType } from '../../dtos/inputs/review/accredited/accredited.input';
import { IReviewBlance } from '../../../../infrastructure/common/models/interfaces/generics/review-balance.interface';
import { ReviewBalanceDto } from '../../dtos/dtos/review/review-balance.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ReviewService extends ResourceService<ReviewDto> {
    constructor(readonly repository: ReviewRepository, readonly reviewSettingService: ReviewSettingService) {
        super(repository);
    }
    async createReview(input: ReviewInput) {
        if (input.accredited && input.accredited.accreditedToEmployee) {
            const { bonus, payment } = await this.getSetting(input.directoryId);
            input.accredited = {
                ...input.accredited,
                bonus,
                payment,
            };
            // TODO: Update user field payment
        }
        return await this.createResource(input);
    }

    async accreditReview(id: string, input: AccreditedInputType) {
        const { directoryId, accredited } = await this.repository.getOne(id);
        if (accredited && typeof accredited.accreditedToEmployee === 'boolean') {
            Logger.log(accredited as AccreditedType, 'accredited');
            throw new NotAcceptableException('This review has already been accredited');
        }
        let changes = input;
        if (input.accreditedToEmployee) {
            const { bonus, payment } = await this.getSetting(directoryId);
            changes = {
                ...input,
                bonus,
                payment,
            };
            // TODO: Update user field payment

        }
        return await this.repository.updateOne(id, { accredited: changes });
    }

    async updateAccredit(id: string, input: AccreditedUpdate) {
        const review = await this.repository.getOne(id);
        let changes = {};
        Object.keys(input).forEach(x => changes[`accredited.${x}`] = input[x]);
        if (input.accreditedToEmployee && (review.accredited && !review.accredited.accreditedToEmployee)) {
            const { bonus, payment } = await this.getSetting(review.directoryId);
            changes = {
                ...changes,
                'accredited.bonus': bonus,
                'accredited.payment': payment,
            };
            // TODO: Update user field payment
        }
        return await this.repository.updateOne(review.id, changes);
    }

    async getSetting(directoryId: string) {
        const setting = await this.reviewSettingService.findOne(directoryId);
        return {
            bonus: setting.bonus,
            payment: setting.payment,
        };
    }

    async filterReview(filter: object, skip: number, limit: number, sort?: string) {
        const total = await this.repository.count(filter);
        return {
            items: await this.repository.find(filter, skip, limit, sort),
            total,
            hasMore: limit + skip < total,
        };
    }

    async getbalance(id?: string): Promise<ReviewBalanceDto> {
        const res = await this.repository.getBalance(id);
        Logger.log(res, 'result');
        return res;
    }
    async getReviewsPerDirectory(filter: any = {}, sort: any = {}, skip = 0, limit = 10) {
        return await this.repository.getReviewsPerDirectory(filter, sort, skip, limit);
    }

    async googleScrape() {
        let scrape = async () => { // Prepare scrape...
            try {
                const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disabled-setuid-sandbox'] }); // Prevent non-needed issues for *NIX
                const page = await browser.newPage(); // Create request for the new page to obtain...

                // Replace with your Google Maps URL... Or Test the Microsoft one...
                //await page.goto('https://www.google.com/maps/place/Microsoft/@36.1275216,-115.1728651,17z/data=!3m1!5s0x80c8c416a26be787:0x4392ab27a0ae83e0!4m7!3m6!1s0x80c8c4141f4642c5:0x764c3f951cfc6355!8m2!3d36.1275216!4d-115.1706764!9m1!1b1');

                await page.goto('https://www.google.com/maps/place/Ananda+Spa/@25.7679707,-80.3666096,17z/data=!4m7!3m6!1s0x88d9b97e68d33533:0xe5f95c7e2dd8f33a!8m2!3d25.7679659!4d-80.3644209!9m1!1b1?hl=es&authuser=0'); // Define the Maps URL to Scrape...
                await page.waitFor(1000); // In case Server has JS needed to be loaded...

                const result = await page.evaluate(() => { // Let's create variables and store values...
                    let reviews = [];

                    var divs = document.querySelectorAll('.section-review-content'), i;

                    for (i = 0; i < divs.length; ++i) {
                        let reviewJson = { fullName: '', postDate: '', starRating: '', postReview: '' };


                        reviewJson.fullName = (<HTMLElement>divs[i].querySelector('.section-review-title')).innerText; // Full Name
                        reviewJson.postDate = (<HTMLElement>divs[i].querySelector('.section-review-publish-date')).innerText; // Date Posted
                        let Rating = divs[i].querySelector('.section-review-stars').getAttribute("aria-label"); // Star Rating
                        reviewJson.postReview = (<HTMLElement>divs[i].querySelector('.section-review-text')).innerText; // Review Posted by Full Name aka Poster

                        let temp = Rating.split(" ");
                        reviewJson.starRating = temp[1];

                        var reviewObj = new ReviewInput();
                        reviewObj.client = reviewJson.fullName;
                        reviewObj.date = new Date();
                        reviewObj.stars = parseInt(reviewJson.starRating);
                        reviewObj.directoryId = 'Google';
                        reviewObj.text = reviewJson.postReview;

                        this.createReview(reviewObj);

                    }

                });

                browser.close(); // Close the Browser...

            } catch (err) {
                console.log(err);
            }


        };

        scrape();

    }
}
