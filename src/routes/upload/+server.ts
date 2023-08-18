import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import s3 from '$lib/server/s3';
import { createId } from '@paralleldrive/cuid2';

export const GET: RequestHandler = async () => {
	const buckets = await s3.listBuckets().promise();
	console.log(buckets);
	return json({});
};

const extensionForMime = {
	'video/webm': 'webm',
	'video/quicktime': 'mov',
	'video/mp4': 'mp4'
};

export const POST: RequestHandler = async ({ request, url }) => {
	const body = await request.formData();
	const file = body.get('file');

	if (!file || typeof file === 'string') {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	// ensure that size is within limits
	if (file.size > 100000000) {
		return json({ error: 'File too large' }, { status: 400 });
	}

	// ensure that file is of a supported type (webm, mov, mp4)
	const supportedTypes = ['video/webm', 'video/quicktime', 'video/mp4'];
	if (!supportedTypes.includes(file.type)) {
		return json({ error: 'File type not supported' }, { status: 400 });
	}

	const id = createId();

	// upload to s3
	const result = await s3
		.upload({
			Bucket: process.env.S3_BUCKET!,
			Key: `${id}.${extensionForMime[file.type]}`,
			Body: Buffer.from(await file.arrayBuffer()),
			ACL: 'public-read'
		})
		.promise();

	return json({
		url: `${url.origin}/video/${id}`
	});
};
