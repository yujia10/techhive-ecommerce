import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Set JWT as an HTTP-Only Cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // use secure only in production environment
		sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	});

	return token;
};

export default generateToken;
