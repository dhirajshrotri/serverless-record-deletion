const mongodb = require('mongodb');

export class MongodbConnectionMapper {
    protected db;
    
    constructor(config) {
        mongodb.connect(config.url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            function(err, client) {
                if(err) {
                    console.log('>> Error connecting to mongodb instance...');
                }
                else {
                    this.db = client.db(config.dbName);
                    console.log('>>> Connected to mongodb ...!!!')
                }
            }
        )
    }

     query(mongoCollection: String, mongoFilter: object): Promise<object | boolean> {
        return new Promise (async (resolve, reject) => {
            try {
                let result = await this.db.collection(mongoCollection).find(mongoFilter);
                if(result.length) {
                    console.log('>>> Records fetched ...!!!');
                    resolve(result);
                }
                else {
                    console.log('>>> No records found...!!!');
                    reject(false);
                }
            }
            catch(e) {
                console.log('>>> Error while running query: ', e);
            }

        })    
    }

}
