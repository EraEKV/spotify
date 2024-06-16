import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
});

const bucketName = 'nf-2024-spotify'; 

class CloudStorageService {
  // async uploadFile(filePath: string): Promise<string> {

  async uploadFile(): Promise<string> {
    const filePath: string = 'text.txt';
  
    // if (!fs.existsSync(filePath)) {
    //   throw new Error(`File ${filePath} does not exist`);
    // }
  
    const bucket = storage.bucket(bucketName);
    const uniqueFileName = `${uuidv4()}-${path.basename(filePath)}`;
    console.log(uniqueFileName);

    try {
      await bucket.upload(filePath, {
        destination: uniqueFileName,
        public: true
      });
  
      return `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}

export default CloudStorageService;