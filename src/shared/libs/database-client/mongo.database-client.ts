
import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { dataBaseClientDict } from './constants.js';
import { DatabaseClient } from './database-client.interface.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {}

  public async connect(uri: string): Promise<boolean> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');
    let attempt = 0;
    while (attempt < dataBaseClientDict.RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return this.isConnected;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(dataBaseClientDict.RETRY_TIMEOUT);
      }
    }
    return this.isConnected;
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
