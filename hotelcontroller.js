var hotelmodel=require('./hotelmodel')

exports.addhotel= function(req,res){

    var h=req.body
    if(h.name&&h.city&&h.category)
    {
        req.body.id=Date.now()
        var hoteldata = new hotelmodel(req.body)
        hoteldata.save().then(function(newhotel){

            console.log("New hotel",newhotel)
            res.send({msg:'Hotel added sucessfully'})
        },
        function(error){
            console.log('error in adding details',error)
            res.send({error:'error in adding hotel'})


        })
        
    }
    else{
        res.send({error:'insufficient details'})
    }
}

exports.allhotel=function(req,res){
    hotelmodel.find({}).then(function(hotel){

        if(hotel.length>0){
            res.send({hotels:hotel})
        }
        else{
            res.send({error:'No hotel found'})
        }

    },
    function(error){
        res.send({error:'error in getting details'})
    })
}
