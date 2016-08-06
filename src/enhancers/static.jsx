import React, { Component } from 'react';

export default WrappedComponent => {
    const displayName = `static(${WrappedComponent.displayName || WrappedComponent.name})`;

    return class Pure extends Component {
        static get displayName() {
            return displayName;
        }

        shouldComponentUpdate() {
            return false;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
