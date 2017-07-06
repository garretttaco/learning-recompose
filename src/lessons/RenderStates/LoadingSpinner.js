import React from 'react'
import PropTypes from 'prop-types'
import Refresh from 'react-icons/lib/fa/refresh'

const LoadingSpinner = ({ isInline, showMessage, message }) => (
	<div className="loading-spinner" style={isInline ? { display: 'inline-block' } : {}}>
		{showMessage ? message || 'Loading...' : ''}
		{' '}
		<Refresh className="spin" />
	</div>
)
LoadingSpinner.propTypes = {
	message: PropTypes.string,
	showMessage: PropTypes.bool,
	isInline: PropTypes.bool,
}

LoadingSpinner.defaultProps = {
	showMessage: true,
	isInline: false,
}

export default LoadingSpinner
