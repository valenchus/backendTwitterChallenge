import AWS from 'aws-sdk';
import { Constants } from './constants';

// config AWS S3
const s3 = new AWS.S3({
  accessKeyId: Constants.S3_ACCESS_KEY_ID,
  secretAccessKey: Constants.S3_SECRET_ACCESS_KEY_ID,
  region: 'us-east-1'
});

export async function generateImageURL(userId: string, fileType: string) {
  const s3Params = {
    Bucket: 'valenbucket7test',
    Key: `s3-images/${userId}.${fileType}`,
    ContentType: `image/${fileType}`,
    ACL: 'public-read',
    Expires: 7000
  };

  try {
    const data = await s3.getSignedUrlPromise('putObject', s3Params);
    return data;
  } catch (err: any) {
    throw new Error(`Error to generate an s3 pre signed url: ${err.message}`);
  }
}