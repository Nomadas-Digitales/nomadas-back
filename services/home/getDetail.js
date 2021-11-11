const { getHome } = require("../../query/home");

module.exports = (db) => async (req, res, next) => {
	const {id} = req.query;
    	
    const result = await getHome(db, { id });

    if(!result){
        return next({ 
            statusCode: 400, 
            error: new Error("Something went wrong.")
         });
    }
	
	res.status(200).json({
		success : true,
        data :{
            result :result
        }
	});
};