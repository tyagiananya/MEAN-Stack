var productmodel = require('./productmodel')

exports.addproduct=function(req,res){
    var p=req.body

    if(p.pname&&p.price&&p.company&&p.category&&p.seller)
    {
        req.body.pid=Date.now()
        var productdata = new productmodel(req.body)
        productdata.save().then(function(newproduct)
        {

         console.log("New product",newproduct)
         res.send({msg:'product added successfully'})

        },
        function(error)
        {
           console.log('error in adding detail',error)
           res.send
          ({
          error:'Error  in adding product'
          })
         
        })
    }
    else
    {
        res.send({
            error:"insuffient details"
        })
    }
}
exports.allproducts=function(req,res){
    productmodel.find({}).then(function(product){

        if(product.length>0){
            res.send({products:product})
        }
        else{
            res.send({error:'No product found'})
        }

    },
    function(error){
        res.send({error:'error in getting details'})
    })
}
exports.getProduct=function(req,res){
    productmodel.findOne({pid:req.params.id})
    .then(function(productfound){
        if(productfound){
            res.send({
                data:productfound,
                code:200
            })
        }
        else{
            res.send({
                message:'no product for this  id',
                code:404
            })
        }
    },
    function(error){
        res.send({error:"Error in finding product",
                    code:500
    })
    }
    )}
