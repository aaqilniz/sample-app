import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  EntityCrudRepository,
  Getter,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Delivery, DeliveryRelations, Post, PostRelations} from '../models';

export class DeliveryRepository extends DefaultCrudRepository<
  Delivery,
  typeof Delivery.prototype.id,
  DeliveryRelations
> {
  public readonly post: HasOneRepositoryFactory<
    Post,
    typeof Delivery.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LetterRepository')
    protected letterRepositoryGetter: Getter<
      EntityCrudRepository<Post, typeof Post.prototype.id, PostRelations>
    >,
    @repository.getter('ParcelRepository')
    protected parcelRepositoryGetter: Getter<
      EntityCrudRepository<Post, typeof Post.prototype.id, PostRelations>
    >,
  ) {
    super(Delivery, dataSource);
    this.post = this.createHasOneRepositoryFactoryFor(
      'post',
      // use a dictionary of repoGetters instead of a single repoGetter instance
      {Letter: letterRepositoryGetter, Parcel: parcelRepositoryGetter},
    );
    this.registerInclusionResolver('post', this.post.inclusionResolver);
  }
}
