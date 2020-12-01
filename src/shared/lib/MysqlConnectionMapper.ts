import { inject } from 'inversify';
import MySQLEventsEmitter from '@lib/MySQLEventsEmitter';
const mysql = require('serverless-mysql')();

export abstract class MysqlConnectionMapper extends MySQLEventsEmitter {

    constructor() {
        super();
        mysql.config({
            user: 'root',
            password: 'UnSecUr3dPassW0rd!',
            host: '172.17.0.1',
            database: 'easyWebDbStorage'
        });
    }

    query(mysqlQuery: String): Promise<object | false> {
        return new Promise(async (resolve, reject) => {
            let results = await mysql.query(mysqlQuery);
            if(results.length) {
                resolve(results);

            }
            else {
                console.log(`>>> No records found !!!`)
                reject(false);
            }
        })
    }
}