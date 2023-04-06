require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb://127.0.0.1:27017/studentcpc";

mongoose.connect(mongoString);
const database = mongoose.connection;
const cors = require("cors");
const app = express();

app.use(cors(
    {
        origin: "*"
    }
));

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const fdetails = new mongoose.Schema({
    transactionid: {
        required: true,
        type: String
    },
    fees: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: Number
    }
})

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    cpcid: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
   
    email: {
        required: true,
        type: String
    },
    month: {
        required: true,
        type: Number
        
    },
    course:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:Number
    },
    amount:{
        required:true,
        type:Number
    },
    
    registered:{
        required:true,
        type:Number
    },
    batch:{
        required:true,
        type:Array
    },
    // timstamps:true,
    feedetails:{
      required:true,
      type:[fdetails]  
    }
},

{ timestamps: true })

const Model = mongoose.model('student', userSchema);


app.use(express.json());


app.post('/login', async (req, res) => {
    try{
        console.log(req.body.cpcid);
        const data = await Model.find({cpcid: req.body.cpcid},)
        // console.log(req.body.username)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




app.get('/', (req, res) => {
    res.send('Welcome in Express Server....!!!')
})
// app.get('/showstudentfees',(req,res)=>{
    // mongoose.connect(mongoString, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("studentcpc");
    //     dbo.collection("students").find({}).toArray(function(err, result) {
    //       if (err) throw err;
    //       console.log(result);
    //       db.close();
    //     });
    //   });
    app.get('/showstudentfees', async (req, res) => {
        try{
            const data = await Model.find();
            res.json(data)
            //console.log(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
    app.post('/getbatch', async (req, res) => {
        try{
            const data = await Model.find();
            res.json(data)
            //console.log(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
    app.post('/loginid', async (req, res) => {
        try{
            console.log("hit");
            const data = await Model.findOne({cpcid: req.body.cpcid},)
            res.json(data)
            //console.log(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
// }
// )
// app.get('/AddStud', (req, res) => {
//     res.send('Welcome in Express Server Add Student....!!!')
// })
// app.patch
app.post('/Addstudent', async (req, res) => {
    console.log("here"+req.body.username)
    
    var userfees={transactionid:"#first",fees:2000,status:0};
    // var userfees= {
    //     "data":[
    //         {
    //           "transactionid": "#f56yf",
    //           "month": 2,
    //           "status": 0,
              
    //         },
    //         {
    //           "transactionid": "#te3y6",
    //           "month": 2,
    //           "status": 1,
              
    //         },
    //         {
    //           "transactionid": "#287t32",
    //           "month": 2,
    //           "status": 1,
              
    //         }
    //       ]
    // }
    
   
    try {
        const checkmail = await Model.findOne({email: req.body.email},)
        if(checkmail==null){
            // console.log(checkmail);
            const data = new Model({
        
                name: req.body.username,
                password:"gh",
                // cpcid:""
                cpcid:"cpcid",
                amount:req.body.amount,
                password:"hj",
                email: req.body.email,
                month: req.body.month+1,
                course:"javascript",
                registered:"0",
                address:"hj",
                phone:56,
                batch:req.body.batch,
                feedetails:[userfees],
        
                // balance:0
            }); 
        
        
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
        // res.json(1);
        }
        else{
            res.json(0);
        }
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


app.post('/registerstudent', async (req, res) => {
    try{
        console.log(req.body.cpcid);
        const student = await Model.findOne({cpcid: req.body.cpcid,registered:"0"},{})
        // console.log(req.body.username)
        console.log(student);
        if(student==null){
            res.json(0);
        }
        else{

        
        await Model.findByIdAndUpdate(student._id, {
            password: req.body.password,
            address:  req.body.address,
            phone:  req.body.phone,
            // registered:1;
            
          });
        res.json(student)

        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.post('/updatestudent', async (req, res) => {
    try{
        console.log(req.body.cpcid);
        const student = await Model.findOne({cpcid: req.body.oldcpcid},{})
        // console.log(req.body.username)
        // console.log(student);
        if(student==null){
            res.json(0);
        }
        else{

        
            console.log(req.body);
            var values = Object.keys(req.body);
            var values1 = Object.values(req.body);


            // if(Object.values(req.body)!=""){
            // console.log(values);
            // }

            var mydata = {};
            for(var i=0;i<values1.length-1;i++){
                if(values1[i]!=""){
                    // console.log(values[i]+" "+values1[i]);
                    mydata[values[i]] = values1[i];
                }

            }
console.log(mydata);
            
        await Model.findByIdAndUpdate(student._id, mydata);
        res.json(student)

        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// app.post('/registerstudent', async (req, res) => {
    
    
//     try {
//         console.log(req.body.cpcid)
//         // await Model.findByIdAndUpdate( { '_id': student._id }, 
//         // // { $set: { 'password':req.body.password  } },
//         // { $set: { 'password':"grdhdrg"  } },
//         // // { $set: { 'address':req.body.address  } },
//         // // { $set: { 'phone':req.body.phone  } },
//         // { $set: { 'address':"kjfsdbkfdfbds"  } },
//         // { $set: { 'phone':"9087654324567"  } }, 
//         // { new: true })



//         // const student = await Model.findOne({cpcid: req.body.cpcid})

//         // res.json(student)

        

//         const data1 = await Model.findOne({cpcid: "cpc12345"},)
//         // console.log(data)

//         res.json(data1)
//     } catch (err) {
//         console.log("error" + err);
//     }
// })

// app.post("/postfees")
app.post('/addfees', async (req, res) => {
    // const student = await studentModel.findById(req.body.sid)
    const student = await Model.findOne({cpcid: "cpc12345"},)

    // const fees= await feeModel.findOne({month: req.body.month,amount:req.body.amount})
    const fees = {fees:"276",status:"0",transactionid:"556453"};
    // console.log("student: " + student + " fees: " + fees)

    try {
        await Model.findByIdAndUpdate(student._id,{
            $push:{feedetails: fees}
        })
        res.json("done")
    } catch (err) {
        console.log('====================================');
        console.log("error" + err);
        console.log('====================================');
    }
   
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})