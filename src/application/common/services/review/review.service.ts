import {AccreditedType, ReviewDto} from '../../dtos/dtos/review/review.dto';
import { Injectable, NotAcceptableException, Logger, HttpService } from '@nestjs/common';
import { ReviewRepository } from '../../../../infrastructure/common/repositories/review.repository';
import { ResourceService } from '../../../core/services/resource.service';
import { ReviewSettingService } from '../settings/review-settings.service';
import { ReviewInput } from '../../dtos/inputs/review/review.input';
import { AccreditedUpdate } from '../../dtos/inputs/review/accredited/accredited.update';
import { AccreditedInputType } from '../../dtos/inputs/review/accredited/accredited.input';
import { IReviewBlance } from '../../../../infrastructure/common/models/interfaces/generics/review-balance.interface';
import { ReviewBalanceDto } from '../../dtos/dtos/review/review-balance.dto';
import * as puppeteer from 'puppeteer';
import { QueryFilterIdDto } from '../../../core/dtos/filter/query-filter/query-filter-id.dto';
import { PaginatedReviewResponse } from '../../dtos/dtos/review/paginate.review.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class ReviewService extends ResourceService<ReviewDto> {
    constructor(readonly repository: ReviewRepository, readonly reviewSettingService: ReviewSettingService, private httpService: HttpService) {
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
        const { bonus, payment } = await this.getSetting(directoryId);
        const changes = {
            ...input,
            bonus: input.accreditedToEmployee ? bonus : 1,
            payment: input.accreditedToEmployee ? payment : 0,
        };
        // TODO: Update user field payment
        return await this.repository.updateOne(id, { accredited: changes });
    }

    async updateAccredit(id: string, input: AccreditedUpdate) {
        const review = await this.repository.getOne(id);
        let changes = {};
        Object.keys(input).forEach(x => changes[`accredited.${x}`] = input[x]);
        if (input.accreditedToEmployee ) {
            if (review.accredited && !review.accredited.accreditedToEmployee) {
                const { bonus, payment } = await this.getSetting(review.directoryId);
                changes = {
                    ...changes,
                    'accredited.bonus': bonus,
                    'accredited.payment': payment,
                };
            }
            // TODO: Update user field payment
        } else {
            changes = {
                ...changes,
                'accredited.bonus': 1,
                'accredited.payment': 0,
            };
        }
        return await this.repository.updateOne(review.id, changes);
    }

    async getSetting(directoryId: string) {
        const setting = await this.reviewSettingService.findResource(directoryId);
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
        try {
            // const directoryId = 'Google';
            const directoryId = (await this.reviewSettingService.getAll(0, 10)).items.find(x => x.directoryName.toLowerCase() === 'google').id;
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disabled-setuid-sandbox'] }); // Prevent non-needed issues for *NIX
            const page = await browser.newPage();
            await page.goto('https://www.google.com/maps/place/Ananda+Spa/' +
              '@25.7679707,-80.3666096,17z/data=!4m7!3m6!1s0x88d9b97e68d33533:0xe5f95c7e2dd8f33a!' +
              '8m2!3d25.7679659!4d-80.3644209!9m1!1b1?hl=es&authuser=0'); // Define the Maps URL to Scrape...
            // Create request for the new page to obtain...
            await page.waitFor(1000); // In case Server has JS needed to be loaded...
            const result: Array<Partial<ReviewInput>> = await page.evaluate(() => {
                const result = [];
                const divs = document.querySelectorAll('.section-review-content');
                for (let i = 0; i < divs.length; ++i) {
                    const reviewObj = {
                        client: ((divs[i] as HTMLElement).querySelector('.section-review-title')).textContent,
                        date: new Date().toISOString().slice(0, 10),
                        stars: parseInt(divs[i].querySelector('.section-review-stars').getAttribute('aria-label').split(' ')[1], undefined),
                        text: divs[i].querySelector('.section-review-text').innerHTML,
                        externalId: divs[i].querySelector('[data-review-id]').getAttribute('data-review-id'),
                    };
                    result.push(reviewObj);
                }
                return result;
            });
            // const reviews = result.map(x => ({ ...x, directoryId } as ReviewInput));
            const filter = {
                externalId: {
                    $in: result.map(x => x.externalId),
                },
                directoryId,
            };
            const paginated: PaginatedReviewResponse = await this.filterReview(filter, 0, result.length);
            for (const review of result.filter(x => !paginated.items.some(y => y.externalId === x.externalId))) {
                await this.createReview({ ...review, directoryId } as ReviewInput);
            }
            await browser.close(); // Close the Browser...
            Logger.log('finished: OK', 'google scrape');
        } catch (err) {
            Logger.log('ERROR: ' + err, 'google scrape');
        }
    }
    async grouponScrape(): Promise<boolean> {
        try {
            const directoryId = (await this.reviewSettingService.getAll(0, 10)).items.find(x => x.directoryName.toLowerCase()
              .startsWith('groupon')).id;
            const { data }: AxiosResponse<Array<Partial<ReviewInput>>> =
              await this.httpService.get('https://us-central1-scrapegrouponfunction.cloudfunctions.net/scrapeGroupon').toPromise();

            const filter = {
                externalId: {
                    $in: data.map(x => x.externalId),
                },
                directoryId,
            };
            const paginated: PaginatedReviewResponse = await this.filterReview(filter, 0, data.length);
            for (const review of data.filter(x => !paginated.items.some(y => y.externalId === x.externalId))) {
                await this.createReview({ ...review, directoryId } as ReviewInput);
            }
            return true;
        } catch (e) {
            Logger.log(e, 'error');
            return false;
        }
    }

    async yelpScrape(): Promise<boolean> {
        try {
            const directoryId = (await this.reviewSettingService.getAll(0, 10)).items.find(x => x.directoryName.toLowerCase()
              .startsWith('yelp')).id;
            const { data }: AxiosResponse<Array<Partial<ReviewInput>>> =
              await this.httpService.get('https://api.anandaspa.us/webscraper/yelp').toPromise();

            const filter = {
                externalId: {
                    $in: data.map(x => x.externalId),
                },
                directoryId,
            };
            const paginated: PaginatedReviewResponse = await this.filterReview(filter, 0, data.length);
            for (const review of data.filter(x => !paginated.items.some(y => y.externalId === x.externalId))) {
                await this.createReview({ ...review, directoryId } as ReviewInput);
            }
            return true;
        } catch (e) {
            Logger.log(e, 'error');
            return false;
        }
    }

    async getReviewUsersBalance(filter: any) {
        return await this.repository.getUsersBalance(filter);
    }
}
