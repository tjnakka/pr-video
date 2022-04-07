import React from 'react';
import Head from 'next/head';
import API from '../service/api';
import links from '../service/links';

function VideoLoadingPlaceHolder() {
	// Component to render Loading stories block.
	return (
		<>
			<div className='col text-center'>
				<span className='placeholder-glow'>
					<div
						style={{ minHeight: 200, width: 200 }}
						className='mx-auto placeholder col-12 rounded-3'
					></div>
				</span>
			</div>
			<div className='col text-center'>
				<span className='placeholder-glow'>
					<div
						style={{ minHeight: 200, width: 200 }}
						className='placeholder col-12 rounded-3'
					></div>
				</span>
			</div>
			<div className='col text-center'>
				<span className='placeholder-glow'>
					<div
						style={{ minHeight: 200, width: 200 }}
						className='placeholder col-12 rounded-3'
					></div>
				</span>
			</div>
		</>
	);
}

function StoryViewer(props) {
	return (
		<>
			<div className='video-container'>
				<div className='videos'>
					{/* Videos Block Start */}
					<div className='videos-wrapper'>
						{props.stories.map((story, index) => (
							<div
								key={story.id}
								id={`${story.id}_story`}
								className={'video text-center'}
							>
								<video
									controls
									muted={true}
									autoPlay={false}
									controlsList='nodownload nofullscreen noplaybackrate'
									disablePictureInPicture
									preload='metadata'
									onClick={(e) => {
										if (e.currentTarget.paused) e.currentTarget.play();
										else e.currentTarget.pause();
									}}
								>
									<source
										src={`/api/stream?slug=${story.slug}&ext=${story.ext}`}
										type={`video/${story.ext}`}
									/>
								</video>
							</div>
						))}
					</div>
					{/* Videos Block End */}

					{/* Controls Block Start */}
					<span
						className='control-btn control-prev'
						type='button'
						onClick={() => {
							let activeVideo = document.querySelector('.video.active');
							if (activeVideo.previousSibling !== null) {
								activeVideo.firstChild.pause();
								activeVideo.classList.remove('active');
								activeVideo.previousSibling.classList.add('active');
								activeVideo.previousSibling.firstChild.play();
							}
						}}
					>
						<i className='bi bi-chevron-left' />
					</span>
					<span
						className='control-btn control-next'
						type='button'
						onClick={() => {
							let activeVideo = document.querySelector('.video.active');
							if (activeVideo.nextSibling !== null) {
								activeVideo.firstChild.pause();
								activeVideo.classList.remove('active');
								activeVideo.nextSibling.classList.add('active');
								activeVideo.nextSibling.firstChild.play();
							}
						}}
					>
						<i className='bi bi-chevron-right fw-bold' />
					</span>
					{/* Controls Block End */}
				</div>
			</div>

			{/* Background Overlay Start */}
			<div
				className='overlay'
				onClick={() => {
					document.querySelectorAll('.video.active').forEach((elem) => {
						elem.classList.remove('active');
						elem.firstChild.pause();
					});
					document.querySelector('.video-container').classList.remove('active');
				}}
			/>
			{/* Background Overlay End */}
		</>
	);
}

export default function OnBoarding() {
	const [stories, setStories] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	var storiesTimer = null;

	React.useEffect(() => {
		getStories();
	}, []);

	function getStories() {
		if (storiesTimer) window.clearTimeout(storiesTimer);
		storiesTimer = setTimeout(() => {
			setLoading(true);
			API({
				...links.getStories,
				urlparams: {},
				bodydata: {},
				isfile: false,
				callback: (res) => {
					setStories(res.data);
					setLoading(false);
				},
			});
		}, 500);
	}

	return (
		<>
			<Head>
				<title>OnBoarding | PropReturns</title>
			</Head>
			<main className='mx-auto px-lg-0 p-3' style={{ maxWidth: '1024px' }}>
				<h2>On Boarding Videos</h2>
				<div className='border bg-light p-3 rounded-3'>
					<div className='container-fluid' style={{}}>
						<div className='row g-2'>
							{loading ? (
								<VideoLoadingPlaceHolder />
							) : (
								<>
									{stories.map((story) => (
										// Display Stories Block on Page.
										<div key={story.id} className='col'>
											<div
												style={{ minHeight: 200, width: 200 }}
												className='d-flex mx-auto align-items-center justify-content-center shadow-sm bg-white p-3 rounded-3 border btn'
												onClick={() => {
													// Process to open Story viewer.
													let elem = document.getElementById(`${story.id}_story`);
													document.querySelector('.video-container').classList.add('active');
													elem.classList.add('active');
													elem.firstChild.play();
												}}
											>
												{story.name}
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>

					<StoryViewer stories={stories} />
				</div>
			</main>
		</>
	);
}
