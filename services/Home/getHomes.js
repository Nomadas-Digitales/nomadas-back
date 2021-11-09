const { getHomes } = require("../../query/home");

module.exports = (db) => async (req, res, next) => {
	const {idCity} = req.query;
	
    const result = await getHomes(db, { idCity });

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
