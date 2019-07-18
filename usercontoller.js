var UserModel = require('./usermodel')
var mailer= require('./mailer.js')

exports.signup = function(req,res)
{

    if(req.body.email&&req.body.password&&req.body.phone&&req.body.name)
    {   // req.body.id=Date.now()
               var userdata =  new UserModel(req.body)
       
       userdata.save().then(function(newuser)
       {
       console.log("new user",newuser)
        
       res.send({   
        msg:'Signup sucess',
        code:200
           
    }) 
      
       mailer.sendMail(req.body.email,"welcome","Sccessfull")
       .then(function(sucess){
    
     
       })
       },
          
        function(error)
     {
        console.log('error in signup',error)
        if(error.code==11000)
        {
            res.send
            ({
                error:"user is already registered",
                code:11000
            })
        }
    
         else
         {
          res.send
          ({
          error:'some error occured in user connection',
          code:404
          })
         }
     }
         )
        
    }
    else
    {
        res.send({
            error:"insuffient details"
        })
    }   
    
}

exports.login= function(req,res)
{
    if(req.body.email && req.body.password){
        UserModel.find({email:req.body.email, password:req.body.password})
        .then(function(user){
            console.log("user found" , user)
          if(user.length>0){
              
              var responseobj = {
                  wallet:user[0].wallet,
                  email:user[0].email,
                  role:user[0].role,
                  name:user[0].name,
                  dob:user[0].dob
              }
              res.send({
                  data:responseobj,
                  msg:'login sucess',
                  code:200
              })
          }
          else{
              res.send({error:"Invalid Login",
            code:500
            })
          }
        },
    function(error){
         res.send({
             error:"Some Error Occured in Login",
             code:404
         })
    })
   }
   else{
       res.send({
           error:"Insufficient  details"
       })
       
   }
 
}
exports.allusers = function(req,res){
    UserModel.find({}).then(function(user){

     if(user.length>0){
            console.log(user)
            res.send({users:user,
            code:200})
        }
        else{
            res.send({
                code:404
            })
        }

    },
    function(error){
        res.send({error:'error in getting details'})
    })
}
exports.forgotpassword=function(req,res)
{
    if(req.body.email){
        UserModel.find({email:req.body.email},function(error,user){
            if(error){
                console.log("Error in user finding")
                res.send({
                    error:"Error in finding detail"
                })
            }

            else if(user.length>0) {
                console.log(user[0].password)
                    mailer.sendMail(user[0].email,user[0].password,"password recovery").then(function(info){
                        if(info){
                            console.log('information',info)
                            res.send({
                                msg:"Mail Sent Sucessfully"
                            })
                        }
                    },
                    function(error){
                        console.log(error)
                        res.send({
                            error:"erro in sending email"
                        })
                    }
                    )

                 
            }
            else{
                res.send({error:"NO user found"})
            }
        })
    }
    
    else{
        res.send({
            error:"Insufficient details"
        })
    }
}

exports.deleteaccount=function(req,res){
    if(req.body.email){
        UserModel.remove({email:req.body.email},function(error){
            if(error){
                console.log("Error in deletion Account")
                res.send({
                    error:"Error in deletion Account",
                    code:404
                })
            }
            else{
                console.log("User deleted successfully")
                res.send({
                    msg:'User deleted successfully',
                    code:200
                })
            }
        })
    }
    else{
        res.send({
            error:'insufficient details',
            code:500
        })
    }
    
}

