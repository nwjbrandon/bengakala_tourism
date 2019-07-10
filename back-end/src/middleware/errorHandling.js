export function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
}

export const errorHandler = [
    (error, req, res, next) => {
        console.log(error);
        return res.status(500).json({
            error: {
                status: 500,
                message: 'Server Error'
            }
        })
    }
];