/* eslint-disable @typescript-eslint/naming-convention */
import {repository} from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
  post,
  requestBody,
  response,
  ResponseObject,
} from '@loopback/rest';
import {Delivery} from '../models';
import {DeliveryRepository} from '../repositories/delivery.repository';

/**
 * OpenAPI response for Delivery()
 */
const DELIVERY_RESPONSE: ResponseObject = {
  description: 'Delivery Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'DeliveryResponse',
        properties: {
          data: {type: 'object'},
        },
      },
    },
  },
};

/**
 * A simple controller to get related delivery records
 */
export class DeliveryController {
  constructor(
    @repository(DeliveryRepository)
    public deliveryRepository: DeliveryRepository,
  ) {}
  // Map to `GET /delivery`
  @get('/delivery')
  @response(200, DELIVERY_RESPONSE)
  async delivery(
    @param.query.string('id')
    id: string,
  ) {
    // return this.deliveryRepository
    //   .post(id)
    //   .get({}, {include: ['post'], polymorphicType: 'Parcel'});
    return this.deliveryRepository.findById(id, {
      include: ['post'],
    });
  }

  // Map to `POST /delivery`
  @post('delivery')
  async createDelivery(
    @requestBody()
    delivery: Delivery & {
      postId: string;
      polymorphicType: 'Letter' | 'Parcel';
      letterTo: string;
      parcelTo: string;
    },
  ): Promise<Delivery> {
    if (!delivery) {
      throw new HttpErrors.UnprocessableEntity('delivery required');
    }
    if (!delivery.postId) {
      throw new HttpErrors.UnprocessableEntity('postId required');
    }
    if (!delivery.polymorphicType) {
      throw new HttpErrors.UnprocessableEntity('polymorphicType required');
    }

    if (
      delivery.polymorphicType !== 'Letter' &&
      delivery.polymorphicType !== 'Parcel'
    ) {
      throw new HttpErrors.UnprocessableEntity(
        'polymorphicType must be Letter or Parcel',
      );
    }
    const {postId} = delivery;
    const {polymorphicType} = delivery;
    const data: any = {};
    if (polymorphicType === 'Letter') data.testing = delivery.letterTo;
    if (polymorphicType === 'Parcel') data.onemore = delivery.parcelTo;
    await this.deliveryRepository.post(postId).create(data, {polymorphicType});
    return this.deliveryRepository.create({
      post_type: polymorphicType,
    });
  }
}
