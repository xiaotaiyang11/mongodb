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
//重置
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
//个人资料
    app.get('/aside',(req,res)=>{
        //console.log(req.query)
        res.header('Access-Control-Allow-Origin','*')      
        mongodb.connect(db_str,(err,database)=>{
            database.collection('user',(err,coll)=>{
                coll.find().toArray((err,data)=>{
                    res.send(data)
                            //console.log(data)
                })
            })
        })        
    })

//个人话题
    app.get('/topic',(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')         
        //console.log(req.query);
        // var current=req.query.current;
        //console.log(current)
        var author=req.query.aa;
        //console.log(author);      
        mongodb.connect(db_str,(err,database)=>{
            database.collection('fabu',(err,coll)=>{             
                    //console.log(datas)
                    coll.find({author:author}).toArray((err,data)=>{
                        res.send(data);
                        database.close()
                        
                    }) 
             
                
            
            })
        })        
    })

//个人回复
app.get('/reply',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')         
    var username=req.query.aa;
    //console.log(username);
    mongodb.connect(db_str,(err,database)=>{
        database.collection('pinglun',(err,coll)=>{
            coll.find({username:username}).toArray((err,data)=>{
              // console.log(data)
              res.send(data)
                database.close()

            })
        })
    })
})






//搜索
app.get('/search',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    //console.log(req.query.cont)
    var cont=new RegExp(req.query.cont);
    mongodb.connect(db_str,(err,database)=>{
        database.collection('fabu',(err,coll)=>{
            coll.find({title:cont}).toArray((err,data)=>{
                res.send(data)
               // console.log(data)
                database.close()

            })
           
        })
    })

})



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

//发布话题
app.get('/pinglun',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var id=ObectId(req.query.keys)
    mongodb.connect(db_str,(err,database)=>{
          database.collection('pinglun',(err,coll)=>{
            if(req.query.dates!='' && req.query.con!=''){
                  coll.insertOne(req.query,()=>{
                     res.send('1')
                     database.collection('fabu',(err,colls)=>{
                         colls.update({_id:id},{$inc:{num2:1}},()=>{

                         })
                     })
                     database.close()
                   })
            }else{
                res.send('0')
                database.close()
            }
        })
    })
})

app.get('/getpinglun',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var keys = req.query.keys;
    mongodb.connect(db_str,(err,database)=>{
        database.collection('pinglun',(err,coll)=>{
            coll.find({keys:keys}).sort({_id:-1}).toArray((err,data)=>{
                res.send(data);
                database.close()
            })
        })
    })
})

//得到排序后的数据
app.get('/daoxu',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var keys = req.query.keys;
    var daoxu = req.query.flag;
    if(daoxu=='倒序查看'){
        mongodb.connect(db_str,(err,database)=>{
            database.collection('pinglun',(err,coll)=>{
                coll.find({keys:keys}).sort({mytime:-1}).toArray((err,data)=>{
                    console.log(data)
                    res.send(data);
                    database.close()
                })
            })
        })
    }else{
        mongodb.connect(db_str,(err,database)=>{
            database.collection('pinglun',(err,coll)=>{
                coll.find({keys:keys}).sort({mytime:1}).toArray((err,data)=>{
                    res.send(data);
                    database.close()
                })
            })
        })
    }
})

//list
app.get('/getlist',(req,res)=>{
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

//详情
app.get('/getDetail',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var id = ObectId(req.query.id)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('fabu',(err,coll)=>{
            coll.find({_id:id}).toArray((err,data)=>{
              res.send(data)
              database.collection('fabu',(err,colls)=>{
                    colls.update({_id:id},{$inc:{num1:1}},()=>{

                    })
                })
                database.close()
            })
        })
    })
})

//回复
app.get('/huipick',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    var id = ObectId(req.query.id)
    console.log(req.query)
    mongodb.connect(db_str,(err,database)=>{
        database.collection('pinglun',(err,coll)=>{
          if(req.query.dates!='' && req.query.con!=''){
                coll.insertOne(req.query,()=>{
                   res.send('1')
                   database.collection('fabu',(err,colls)=>{
                       colls.update({_id:id},{$inc:{num2:1}},()=>{

                       })
                   })
                   database.close()
                 })
          }else{
              res.send('0')
              database.close()
          }
      })
  })
})

app.listen(8000)