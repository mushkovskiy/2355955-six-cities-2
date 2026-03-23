import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockServerData, OfferTypeEnum, } from '../../types/index.js';
import { tsvOfferGeneratorDict } from './constants.js';
import { OfferGenerator } from './offer-generator.interface.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).join(';');
    const type = getRandomItem([OfferTypeEnum.Buy, OfferTypeEnum.Sell]);
    const price = generateRandomValue(tsvOfferGeneratorDict.MIN_PRICE, tsvOfferGeneratorDict.MAX_PRICE).toString();
    const city = getRandomItem<string>(this.mockData.cities);
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite).toString();
    const roomsCount = getRandomItem<number>(this.mockData.capacity.bedrooms).toString();
    const commentsCount = '0';
    const visitorsCount = getRandomItem<number>(this.mockData.capacity.maxAdults).toString();
    const coordinates = getRandomItem<string>(this.mockData.coordinates);
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const rating = getRandomItem<number>(this.mockData.ratings).toString();

    const author = getRandomItem(this.mockData.users);
    const [firstName, lastName] = author.split(' ');
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const account = getRandomItem<string>(this.mockData.accounts);

    const createdDate = dayjs()
      .subtract(generateRandomValue(tsvOfferGeneratorDict.FIRST_WEEK_DAY, tsvOfferGeneratorDict.LAST_WEEK_DAY), 'day')
      .toISOString();


    return [
      title, description, createdDate,
      previewImage, images, type, price, city,
      isPremium, isFavorite, roomsCount, commentsCount, visitorsCount,
      coordinates, amenities, housingType, rating,
      firstName, lastName, email, avatar, account,
    ].join('\t');
  }
}
