import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const ProgressiveImage = ({ render, uri, thumbnail, initialBlur, timingFunction, transitionTime }) => {
	const [blur, setBlur] = useState(initialBlur);
	const [src, setSrc] = useState(thumbnail);

	const fetch = useCallback(() => {
		console.log('FETCH', uri);
		const image = new Image();
		image.src = uri;
		image.addEventListener(
			'load',
			() => {
				setSrc(uri);
				setBlur(0);
			},
			false
		);
	}, [uri]);

	const getStyle = () => {
		return {
			filter: `blur(${blur}px)`,
			transition: `filter ${transitionTime}ms ${timingFunction}`,
		};
	};

	return (
		<VisibilitySensor partialVisibility={true}>
			{({ isVisible }) => {
				if (isVisible && blur) fetch();

				return render(src, getStyle());
			}}
		</VisibilitySensor>
	);
};

ProgressiveImage.defaultProps = {
	transitionTime: 500,
	timingFunction: 'ease',
	initialBlur: 10,
};

ProgressiveImage.propTypes = {
	transitionTime: PropTypes.number,
	timingFunction: PropTypes.string,
	initialBlur: PropTypes.number,
	uri: PropTypes.string.isRequired,
};

export default ProgressiveImage;
