import 'reflect-metadata';
import {Container} from 'inversify';
import {LoggerInterface} from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {Component} from './types/component.types.js';
import {ConfigInterface} from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import Application from './app/application.js';
import {DatabaseInterface} from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import {UserModel} from './modules/user/user.entity.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();

const user = await UserModel.create({
  email: 'test@email.local',
  avatarPath: 'keks.jpg',
  name: 'Keks',
  status: 'Unknown',
  password: '123'
});

console.log(user);
