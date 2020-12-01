import { MysqlRepo } from '@lib/repos/MysqlRepo';
import { injectable } from 'inversify';

@injectable()
export class RecordService {
    public constructor(
        private MysqlRepo: MysqlRepo
    ) {

    }

    public async getRecords(fromDate: String, toDate: String): Promise<object| any> {
        let result = await this.MysqlRepo.query(`SELECT id,resource_entity_id, resource_entity
            FROM files WHERE CAST(created_date_time AS DATE) >= DATE(${fromDate})
            AND CAST(created_date_time AS DATE) <= DATE(${toDate})`);

        return result;
    }
}