import React, { PureComponent } from 'react';

export default WrappedComponent => {
    const displayName = `pure(${WrappedComponent.displayName || WrappedComponent.name})`;

    return class Pure extends PureComponent {
        static get displayName() {
            return displayName;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
