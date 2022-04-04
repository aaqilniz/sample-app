import {repository} from '@loopback/repository';
import {get, post, response, ResponseObject} from '@loopback/rest';
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
  async delivery() {
    return this.deliveryRepository.findById('624aa06a0de807359e79c68d', {
      include: ['post'],
    });
  }

  // Map to `POST /delivery`
  @post('/delivery')
  @response(200, DELIVERY_RESPONSE)
  async createDelivery() {
    const postCreated = await this.deliveryRepository
      .post('624aa06a0de807359e79c68d')
      .create({}, {polymorphicType: 'Letter'});
    const delivery = await this.deliveryRepository.create({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      post_type: 'Letter',
    });
    return {delivery, post: postCreated};
  }
}
