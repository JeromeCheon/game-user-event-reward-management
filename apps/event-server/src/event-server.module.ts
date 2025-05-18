import { Module } from '@nestjs/common';
import { EventServerController } from './presentation/event-server.controller';
import { EventServerService } from './application/event-server.service';
import { EVENT_REPOSITORY } from './domain/event.repository';
import { MongooseEventRepository } from './infra/mongoose.event.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionUrl } from '@app/common/variable/db-connection';
import { EventDocument } from '@app/schema/schemas/event.schema';
import { EventSchema } from '@app/schema/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: EventDocument.name, schema: EventSchema },
    ]),
  ],
  controllers: [EventServerController],
  providers: [
    EventServerService,
    {
      provide: EVENT_REPOSITORY,
      useClass: MongooseEventRepository,
    },
  ],
})
export class EventServerModule {}
