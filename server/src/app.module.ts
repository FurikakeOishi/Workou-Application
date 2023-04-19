import { Module ,NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WorkoutModule } from './workout/workout.module';
import { ExercisesService } from './exercises/exercises.service';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [WorkoutModule, ExercisesModule],
  controllers: [AppController],
  providers: [AppService, ExercisesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    
  }
}
