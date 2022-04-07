import Method from '../../service/method';

// API to get Personalized Stories for User.

const stories = [
	{ id: 1, name: 'Story 1', slug: 'story_1', ext: 'mp4' },
	{ id: 2, name: 'Story 2', slug: 'story_2', ext: 'mp4' },
	{ id: 3, name: 'Story 3', slug: 'story_3', ext: 'mp4' },
];

export default function handler(req, res) {
	if (req.method === Method.GET) {
		// Fetch Stories Data from DB.
		res.status(200).json(stories);
	} else {
		res.status(405).json({
			message: 'Method Not Allowed.',
		});
	}
}
