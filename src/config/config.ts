import { Expose, plainToClass } from 'class-transformer';
import config = require('./finalConfig.json');
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
class Config{

    constructor() {}
}


let configuration = plainToClass(Config, config, { excludeExtraneousValues: true })

Object.freeze(configuration);


export { Config, configuration }