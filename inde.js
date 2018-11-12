var express = require("express")

var mongodb =  require("mongodb").MongoClient;
var ObectId = require("mongodb").ObjectId
var db_str = "mongodb://127.0.0.1:27017/zz1805";

var app = express()
app.get('/login',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	//console.log(req.query)
     var username=req.query.username
    // console.log(username)
     var pass=req.query.password;
     //console.log(pass)
			mongodb.connect(db_str,(err,database)=>{
				database.collection('user',(err,coll)=>{
					coll.find({username:username}).toArray((err,data)=>{
                        console.log(data)
						if(data.length>0){
							res.send('1')
							database.close()
						}else{
                            console.log(data)
							coll.save({username:username,pass:pass},()=>{
								res.send('2')
								database.close()
							})
						}
					})
				})
            })
		
	})
	
	
    app.get('/register',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
        //console.log(req.query)
        var username=req.query.username;
        var pass=req.query.password;
        mongodb.connect(db_str,(err,database)=>{
                    database.collection('user',(err,coll)=>{
                        coll.find({username:username,pass:pass}).toArray((err,data)=>{
                            if(data.length>0){
                                res.send('1')
                                database.close()
                            }
                        })
                    })
                })
        
    })
    

    app.get('/reset',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
       // var id=req.query.id;
        var username=req.query.username;
        console.log(username)
            var pass=req.query.password;
            console.log(pass)
                console.log('插入数据库')
                mongodb.connect(db_str,(err,database)=>{
                    database.collection('user',(err,coll)=>{
                        coll.update({username:username},{$set:{pass:pass}},(err,data)=>{
                            res.send('1')
                            database.close()
                        })
                    })
                })
        //console.log(req.query)
    })

app.listen(8000)