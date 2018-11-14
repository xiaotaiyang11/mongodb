var express = require("express")

var mongodb =  require("mongodb").MongoClient;
var ObectId = require("mongodb").ObjectId
var db_str = "mongodb://127.0.0.1:27017/zz1805";

var app = express()
//注册
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
	
	//登录
    app.get('/register',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
        //console.log(req.query)
        var username=req.query.username;
        var pass=req.query.password;
        mongodb.connect(db_str,(err,database)=>{
                    database.collection('user',(err,coll)=>{
                        coll.find({username:username,pass:pass}).toArray((err,data)=>{
                            console.log(data);
                            if(data.length>0){
                                res.send('1')
                                database.close()
                            }
                        })
                    })
                })
        
    })
    
//重置密码
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
                            console.log(data)
                            database.close()
                        })
                    })
                })
        //console.log(req.query)
    })

<<<<<<< HEAD
//列表
    app.get('/getData',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
        mongodb.connect(db_str,(err,database)=>{
            database.collection('fabu',(err,coll)=>{
                coll.find().toArray((err,data)=>{
                    res.send(data)
                    database.close()
                })
            })
        })       
    })


//发布新话题

app.get('/fabu',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    //  console.log(req.query)
    req.query.num1=parseInt(req.query.num1)
    req.query.num2=parseInt(req.query.num2)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('fabu',(err,coll)=>{
            coll.save(req.query,()=>{
                res.send('1')
                database.close()
            })
        })
    })       
})




=======
 //填写资料
    app.get('/ziliao',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
        //console.log(req.query)
        var username=req.query.username;
        console.log(username)
        var sex=req.query.sex;
        console.log(sex);
        var age=req.query.age;
        var zuo=req.query.zuo;
        mongodb.connect(db_str,(err,database)=>{
                    database.collection('user',(err,coll)=>{
                           // console.log(data);
                           coll.find({username:username}).toArray((err,data)=>{
                            if(data.length>0){
                                coll.update({username:username},{$set:{sex:sex,age:age,zuo:zuo}},(err,data)=>{
                                    res.send('1')
                                    database.close()
                                })  
                             }
                            })
                    })
                })
        
    })
>>>>>>> cadbaeb8d6f060d362d89ce6197692bcb13cf1d8
app.listen(8000)