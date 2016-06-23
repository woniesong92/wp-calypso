/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import RootChild from 'components/root-child';

export default React.createClass( {
	getInitialState() {
		return {
			renderChildren: true
		};
	},

	componentDidMount() {
		if ( this.props.firstViewActive ) {
			document.documentElement.classList.add( 'no-scroll' );
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! nextProps.firstViewActive ) {
			// Need to delay this in order to allow CSS transition to complete first
			setTimeout( this.removeChildren, 200 );
		}
	},

	componentDidUpdate() {
		if ( this.props.firstViewActive ) {
			document.documentElement.classList.add( 'no-scroll' );
		} else {
			document.documentElement.classList.remove( 'no-scroll' );
		}
	},

	componentWillUnmount() {
		document.documentElement.classList.remove( 'no-scroll' );
	},

	render: function() {
		const classes = classNames( 'wp-content', 'first-view', {
			active: this.props.firstViewActive
		} );

		return (
			<RootChild className={ classes }>
				{ this.state.renderChildren && (
					<div className="first-view__content">
						<div>
							{ this.props.children }
						</div>

						<Button onClick={ this.onDismiss }>Got it!</Button>
					</div>
				) }
			</RootChild>
		);
	},

	onDismiss: function() {
		if ( this.props.onFirstViewDismiss ) {
			this.props.onFirstViewDismiss();
		}
	},

	removeChildren: function() {
		this.setState( { renderChildren: false } );
	}
} );