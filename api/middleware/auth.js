import jwt from 'jsonwebtoken';

const auth = async (req, _, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isCustomAuth = token.lenght < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.SECRET);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (err) {
		console.error(err);
	}
};

export default auth;
