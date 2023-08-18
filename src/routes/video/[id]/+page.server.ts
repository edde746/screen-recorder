import s3 from '$lib/server/s3';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// find file in s3
	const result = await s3
		.listObjectsV2({
			Bucket: process.env.S3_BUCKET!,
			Prefix: `${params.id}.`
		})
		.promise();

	if (!result.Contents?.length) throw error(404, 'Video not found');

	const file = result.Contents[0];

	return {
		url: await s3.getSignedUrlPromise('getObject', {
			Bucket: process.env.S3_BUCKET!,
			Key: file.Key!,
			Expires: 60 * 60
		}),
		date: file.LastModified
	};
};
