import 'dotenv/config';
import jwt from 'jsonwebtoken';

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');


    try {


        if (!token) {

            res.status(401).send({ error: "Authenticate using valid jwt token" });

        }
        else {

            const { userId } = jwt.verify(token, "" + process.env.JWT_SECRET);
            req.userId = userId;
            next();

        }

    } catch (error) {

        res.status(401).json({ error: "Authentication failed. Invalid JWT token" });

    }

}

export default fetchuser;