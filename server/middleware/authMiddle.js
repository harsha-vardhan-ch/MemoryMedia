import jwt from 'jsonwebtoken';

const auth = async(req,res,next) => {
    try{
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        // Deciding if token is custom token or third party token through length.
        // False = Google Token, True = Manual token
        const isCustomAuth = token.length<500;

        let decodedData;
        // For manual login
        if(token && isCustomAuth){
            // Verifyinh token with the secret phrase used for creating token.
            decodedData = jwt.verify(token ,'test');
            req.userID = decodedData?.id;
        }
        // For 3rd party google login
        else{
            decodedData = jwt.decode(token);
            req.userID = decodedData?.sub;   // userID provided through sub variable in Google Auth
        }
        next();
    }
    catch(error){
        console.log(error);
    }
}

export default auth;