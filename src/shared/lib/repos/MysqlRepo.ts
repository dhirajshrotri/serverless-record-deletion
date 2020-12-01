import { injectable, inject } from 'inversify';
import { MysqlConnectionMapper } from '@lib/MysqlConnectionMapper';
// import { Config } from '@config/config';

@injectable()
export class MysqlRepo extends MysqlConnectionMapper {
    constructor() {
        super()
    }

    async query(mysqlQuery: String) {
        let response = await super.query(mysqlQuery);

        return response;
    }
}