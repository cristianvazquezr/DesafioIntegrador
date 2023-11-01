import EErrors from "../enums.js";

const errorHandler=(error, req, res, next)=>{
    console.log(error.cause)
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:'error', error: error.name})
            break
        default:
            res.send({status:'error', error: 'ahundled error'})
    }
}

export default errorHandler