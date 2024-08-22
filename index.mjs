import { log } from "./log.mjs";
import { S3 } from '@aws-sdk/client-s3';   

const s3Client = new S3({region: 'us-east-1'});

export const handler = async (event, context, callback) => {
    const record = event.record[0];
    const Bucket = record.s3.bucket.name;
    const Key = record.s3.object.key;
    const getObjectResult =  s3Client.getObject({
        Bucket,
        Key,
    }).then( getObjectResult => {
        const mega_byte = 1024 * 1024;

        if (getObjectResult.ContentLength > 1 * mega_byte) {
          log('Objeto muito grande');
          callback('Objeto muito grande');
        }
    
        log('Objeto de Tamanho OK');
        callback('Objeto de Tamanho OK');
    });
};
