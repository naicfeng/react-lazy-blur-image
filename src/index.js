import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const ProgressiveImage = ({ render, uri, placeholder, initialBlur, timingFunction, transitionTime }) => {
	const [blur, setBlur] = useState(initialBlur);
	const [src, setSrc] = useState(
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzg0IiBoZWlnaHQ9IjI1NiIgdmVyc2lvbj0iMS4xIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNlYmViZWIiIG9mZnNldD0iMjAlIi8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmM2YzZjMiIG9mZnNldD0iNTAlIi8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNlYmViZWIiIG9mZnNldD0iNzAlIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMzg0IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2ViZWJlYiIvPgogIDxyZWN0IGlkPSJyIiB3aWR0aD0iMzg0IiBoZWlnaHQ9IjI1NiIgZmlsbD0idXJsKCNnKSIvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNDgwIiB0bz0iNDgwIiBkdXI9IjEuMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+Cjwvc3ZnPg=='
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
	
	useEffect(()=>{
		setSrc(uri);
	}, [uri]);

	const getStyle = () => {
		return {
			filter: `blur(${blur}px)`,
			transition: `filter ${transitionTime}ms ${timingFunction}`,
		};
	};

	return (
		<VisibilitySensor offset={{ bottom: -300, top: -300, left: -300, right: -300 }} partialVisibility={true}>
			{({ isVisible }) => {
				if (isVisible && blur) {
					setSrc(placeholder);
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
	placeholder: PropTypes.string.isRequired,
};

export default ProgressiveImage;
