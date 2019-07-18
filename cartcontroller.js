var CartModel=require("./cartmodel")
exports.addtocart=function(req,res){
    if(req.body.email&&req.body.pid){
    
var cartdata = new CartModel(req.body)
cartdata.save(function(error,cartitem){
    if(cartitem){
        console.log("item added to cart",cartitem)
        res.send({
            code:200,
            cartitem:cartitem
        })
    }
    else{
        console.log("error in adding to cart",error)
        res.send({
            code:500,
            error:'internal server error'
        })
    }
})
}
else{
console.log("insufficient details")
res.send({
    code:510,
    error:'insufficient details'
})
}
}
exports.cartitems=function(req,res){
    if(req.body.email){
        CartModel.find({email:req.body.email},function(error,cartitems){
            if(cartitems.length>0){
                res.send({
                    code:200,
                    cartitems:cartitems
                })
            }
            else if(error){
                res.send({
                    code:500,
                    error:"Internal server error"
                })
            }
            else{
                res.send({
                    error:"no item in cart",
                    code:404
                   
                })
            }
        }
        )}
    else{
        res.send({
            error:"insufficient details",
            code:510
        })
    }

}
exports.deleteitem=function(req,res){
    if(req.body.email&&req.body.pid){
        CartModel.remove({email:req.body.email,pid:req.body.pid},function(error){
            if(error){
                console.log(error)
                res.send({
                    code:500,
                    error:"Error in deletion"
                })
            }
            else{
                console.log('sucess')
                res.send({
                    code:200,
                    msg:"product removed"
                })
            }
        })
    }
    else{
        res.send({
            code:404,
            error:"Insufficient details"
        })
    }
}