var  ordermodel=require('./ordermodel')
var cartmodel=require("./cartmodel")
var mailer=require('./mailer')
exports.addorder=function(req,res){
    var details=req.body
    if(details.email&&details.name&&details.totalprice&&details.phone&&details.area&&details.city&&details.pincode&&details.street&&details.items.length>0)
    {   
        details.oid=Date.now()
        var orderdata= new ordermodel(details)
         orderdata.save(function(error,neworder){
            if(neworder){
                console.log("order placed")
                mailer.sendMail(details.email,"Order Placed","Your order has been successfully placed and your order id id"+details.oid+". your total order price is"+details.totalprice)
                cartmodel.remove({email:details.email},function(error){
                    if(error){
                        res.send({
                            code:510,
                            error:"error in deletion item from cart"                       
                         })
                    }
                    else{
                        res.send({
                            code:200,
                            msg:"order placed",
                            order:neworder
                           
                        })
                    }
                })
            }
            else{
                console.log("error in placing order",error)
                res.send({
                    code:500,
                    error:"error in placing order"
                })
            }
        })
      
    }
    else{
        res.send({
            error:"insufficient details",
            code:404
        })
    }
}
exports.getorder=function(req,res){
    if(req.body.oid){
        ordermodel.findOne({oid:req.body.oid},function(error,order){
            if(error){
                res.send({
                    code:500,
                    error:'error in finding order'
                })
            }
            else if(order){
                res.send({
                    code:200,
                    msg:'order found successfully',
                    order:order
                })
            }
            else{
                res.send({
                    code:404,
                    error:'invalid details'
                })
            }
        })
    }
    else{
        res.send({
            error:'insufficient details'
        })
    }
}
exports.myorders=function(req,res){
    if(req.body.email){
    ordermodel.find({email:req.body.email},function(error,orders){
        if(orders.length>0){
            res.send({
                orders:orders,
                code:200,
                msg:'orders found successfully'
            })
        }
        else if(orders.length<=0){
            res.send({
                code:404,
                error:'no order found'
            })
        }
        else{
            res.send({
                error:'error in finding orders',
                code:500
            })
        }
    })
}
}

exports.allorders=function(req,res){
    ordermodel.find({},function(error,orders){
        if(orders.length>0){ 
            res.send({
                code:200,
                orders:orders
            })
         }
         else if(orders.length<=0){
             res.send({
                 code:404,
                 error:"no order found"
             })
         }

         else{
             res.send({
                 code:500,
                 error:"internal server error"
             })
         }
    })
   

    
}