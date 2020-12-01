const EventEmitter = require('events');

declare interface MySQLEventsEmitter {
    on(event: 'onConnect', listerner: () => void): this;
    on(event: 'onConnectError', listener: (e: any) => void): this;
    on(event: 'onError', listener: (e: any) => void): this;
}

class MySQLEventsEmitter extends EventEmitter{
    onConnect():void { 
        console.log(`>> Connection to MySQL established`);
    }

    onConnectionError(e: any): void {
        console.log(`>> Error connecting to MySQL: `+e.code);
    }

    onError(e: any): void {
        console.log('>>> Error: ' + e.code + '\\n >>> Error while executing query: '+ e.sqlMessage);
    }
}

export default MySQLEventsEmitter;