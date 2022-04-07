import Method from '../../service/method';

// API to stream video in 1MB chuncks.

const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
	if (req.method === Method.GET) {
		// Check for Range Header.
		const range = req.headers.range;
		if (!range) {
			res.status(400).json({
				message: 'Range header Missing.',
			});
		}

		// Check for Required Params.
		['slug', 'ext'].forEach((param) => {
			if (!req.query?.[param])
				res.status(400)({
					message: `Param -> ${param} is Missing.`,
				});
		});

		// get video details.
		const videoName = `${req.query.slug}.${req.query.ext}`;
		const videoPath = path.join(process.cwd(), 'videos', videoName);
		const videoSize = fs.statSync(videoPath).size;

		// Parse Range - e.g "bytes=32324-"
		const CHUNK_SIZE = 10 ** 6; // 1MB
		const start = Number(range.replace(/\D/g, ''));
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

		// Create headers
		const contentLength = end - start + 1;
		const headers = {
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': contentLength,
			'Content-Type': 'video/mp4',
		};

		// HTTP Status 206 for Partial Content
		res.writeHead(206, headers);

		// create video read stream for this particular chunk
		const videoStream = fs.createReadStream(videoPath, { start, end });

		// Stream the video chunk to the client
		videoStream.pipe(res);
	} else {
		res.status(405).json({
			message: 'Method Not Allowed.',
		});
	}
}
