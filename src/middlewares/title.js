let prev = document.title;

export default ({ getState }) => (next) => (action) => {
    const { title } = getState().board || {};

    if (title !== prev) {
        prev = document.title = title ? `${title} - Nekoboard` : 'Nekoboard';
    }

    return next(action);
};
