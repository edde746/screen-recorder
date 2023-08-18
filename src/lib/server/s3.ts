import AWS from 'aws-sdk';

export default new AWS.S3({
	endpoint: process.env.S3_ENDPOINT,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
	s3ForcePathStyle: true,
	signatureVersion: 'v4'
});
