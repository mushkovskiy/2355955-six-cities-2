import { Container } from 'inversify';
import 'reflect-metadata';
import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createAuthContainer } from './shared/modules/user/auth/auth.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { Component } from './shared/types/component.type.js';
async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer(), createOfferContainer(), createCommentContainer(), createAuthContainer());


  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();

}

bootstrap();
