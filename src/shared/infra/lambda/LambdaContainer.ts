import { Container } from 'inversify'
import 'reflect-metadata'
import { Environment } from '@lib/enums/Environment'
import { Property } from '@lib/symbols/Property'
import { Region } from '@lib/enums/Region'
import { Config, configuration } from '@config/config'
console.log('-+-+-+-+-+-+-+-+ Lambda Container Init start -+-+-+-+-+-+-+-+')

const LambdaContainer = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
  defaultScope: 'Singleton'
})

LambdaContainer.bind<string>(Property.REGION).toConstantValue(process.env.REGION ?? Region.Ireland)
LambdaContainer.bind<string>(Property.ENVIRONMENT).toConstantValue(process.env.NODE_ENV ?? Environment.Development)
//AWS.config.update({ region: LambdaContainer.get(configuration.aws.default_region) })
LambdaContainer.bind(Config).toConstantValue(configuration)

console.log('-+-+-+-+-+-+-+-+ Lambda Container Init end -+-+-+-+-+-+-+-+')
export { LambdaContainer }
