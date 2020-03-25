import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const ProgressiveImage = ({ render, uri, thumbnail, initialBlur, timingFunction, transitionTime }) => {
	const [blur, setBlur] = useState(initialBlur);
	const [src, setSrc] = useState(
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEXMzMzKUkQnAAAAH0lEQVRoQ+3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAvg0hAAABy+M9HgAAAABJRU5ErkJggg=='
	);

	const fetch = useCallback(() => {
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
		<VisibilitySensor offset={{ bottom: -500 }} partialVisibility={true}>
			{({ isVisible }) => {
				if (isVisible && blur) {
					setSrc(thumbnail);
					fetch();
				}

				return render(src, getStyle());
			}}
		</VisibilitySensor>
	);
};

ProgressiveImage.defaultProps = {
	transitionTime: 500,
	timingFunction: 'ease',
	initialBlur: 5,
};

ProgressiveImage.propTypes = {
	transitionTime: PropTypes.number,
	timingFunction: PropTypes.string,
	initialBlur: PropTypes.number,
	uri: PropTypes.string.isRequired,
};

export default ProgressiveImage;
