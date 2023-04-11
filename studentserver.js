require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var mongoString = "mongodb://127.0.0.1:27017/studentcpc";

mongoose.connect(mongoString);
var database = mongoose.connection;
var cors = require("cors");
var app = express();

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
var fdetails = new mongoose.Schema({
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

var userSchema = new mongoose.Schema({
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

var Model = mongoose.model('student', userSchema);


app.use(express.json());


app.post('/login', async (req, res) => {
    try{
        console.log(req.body.cpcid);
        var data = await Model.find({cpcid: req.body.cpcid},)
        // console.log(req.body.username)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
// app.post('/updatepend', async (req, res) => {
//     try{
//         // console.log(req.body.cpcid);
//         // console.log(req.body.tid);

//         // var data = await Model.find({cpcid: "cpcid3", "feedetails" : { "$elemMatch" : { "transactionid" : "#first" }} })
//         // await Model.findByIdAndUpdate(data._id, {
//         //     feedetails: {transactionid:"jhjvjh"}
//         //     // registered:1;
            
//         //   });
//           res.json(data);
         
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })
app.post('/deletestudent', async (req, res) => {
console.log("deleted");
    try{
        var result = await Model.deleteOne({cpcid: req.body.cpcid})
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sayandip31072003@gmail.com',
          pass: 'ovcvjfosjxcyenyh'
        }

      });
      var mailOptions = {
        from: 'sayandip31072003@gmail.com',
        to: req.body.email,
        subject: 'Subject',
        
        html: `<div>
        <h1>Dear `+req.body.name+`,</h1>
        <p>Your name has been removed from CPC Education.If this is not expected kindly contact to the centre.</p>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        //   break;
          // do something useful
        }
      });
    
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
          }
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
            var data = await Model.find();
            res.json(data)
            //console.log(data)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })
    app.post('/getbatch', async (req, res) => {
        try{
            var data = await Model.find();
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
            var data = await Model.findOne({cpcid: req.body.cpcid},)
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
    
    var userfees={transactionid:req.body.cpcid+"#first",fees:2000,status:0};
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
        var checkmail = await Model.findOne({email: req.body.email},)
        if(checkmail==null){
            // console.log(checkmail);
            var data = new Model({
        
                name: req.body.username,
                password:"gh",
                // cpcid:""
                cpcid:req.body.cpcid,
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
        
        
        var dataToSave = await data.save();
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
        var student = await Model.findOne({cpcid: req.body.cpcid,registered:"0"},{})
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
        var student = await Model.findOne({cpcid: req.body.oldcpcid},{})
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
// console.log(values.batch);

            
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



//         // var student = await Model.findOne({cpcid: req.body.cpcid})

//         // res.json(student)

        

//         var data1 = await Model.findOne({cpcid: "cpc12345"},)
//         // console.log(data)

//         res.json(data1)
//     } catch (err) {
//         console.log("error" + err);
//     }
// })

// app.post("/postfees")
app.post('/addfees', async (req, res) => {
    // var student = await studentModel.findById(req.body.sid)
    var student = await Model.findOne({cpcid: "cpc12345"},)

    // var fees= await feeModel.findOne({month: req.body.month,amount:req.body.amount})
    var fees = {fees:"276",status:"0",transactionid:"556453"};
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



app.post("/sendmailreg",(req,res)=>{
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sayandip31072003@gmail.com',
          pass: 'ovcvjfosjxcyenyh'
        }
      });
      var showbatch="";
      var times=["7:00-9:00AM","9:00-12:00PM","12:00-2:00PM","2:00-4:00PM","4:00-6:00PM","6:00-8:00PM","8:00-10:00PM"];
var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var keys=['a','b','c','d','e','f','g'];
for(var i=0;i<req.body.batch.length;i++){
    var s1=req.body.batch[i][0];
    var s2=req.body.batch[i][1];
    var s3=keys.indexOf(s2);
    console.log(s2+" "+s3);
     showbatch=showbatch+days[s1-1]+" : "+times[s3]+"<hr/>"

    
}
// document.getElementById("show").innerHTML=showbatch;

    var mailOptions = {
        from: 'sayandip31072003@gmail.com',
        to: req.body.email,
        subject: 'Subject',
        
        html: `<div>
        <h1>Dear `+req.body.username+`,</h1>
        <p>Welcome to CPC Education.you have enrolled through this email id.</p>
        <article>Kindly register through your CPCid and Email to the below given link.</article>
        <div>
            <p><strong>CPCid</strong>:`+req.body.cpcid+`</p>
            <p><strong>Email</strong>:`+req.body.email+`</p>
        </div>
        <strong>Your enrolled course is:javascript</strong>

        <strong>Your monthly fees is:`+req.body.amount+`</strong>
        <br />
        Your Enrolled batch:
        <table>
            <thead style="border:1px solid black">
                <td style="border:1px solid black">Date and time</td>
            </thead>
            <br/>
            <hr/>
            <tbody id="show">
            `+showbatch+`
                
               
            </tbody>
        </table>
        
    </div>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        //   break;
          // do something useful
        }
      });
   
    })
    
    

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})