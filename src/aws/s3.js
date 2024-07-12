import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { Upload } from "@aws-sdk/lib-storage";
import { config } from 'dotenv';
config();

const albumBucketName = process.env.NEXT_PUBLIC_S3_ASSETS_NAME;
const bucketRegion = process.env.NEXT_PUBLIC_S3_ASSETS_REGION;
const IdentityPoolId = process.env.NEXT_PUBLIC_S3_IDENTITY_POOL_ID;

const s3 = new S3Client({
  region: bucketRegion,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: bucketRegion }),
    identityPoolId: IdentityPoolId,
  }),
});

const uploadImageToS3 = async (file, photoKey) => {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
    },
  });

  try {
    const data = await upload.done();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error };
  }
};

export default uploadImageToS3;
