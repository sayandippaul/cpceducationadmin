require("dotenv").config();

var express = require("express");
var mongoose = require("mongoose");
mongoString=process.env.databaseconnectionstring;
mongoose.connect(mongoString);
var database = mongoose.connection;
var cors = require("cors");
var app = express();
const port = process.env.PORT || 3000

// var montharr=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
var montharr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

app.use(
  cors({
    origin: "*",
  })
);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
var fdetails = new mongoose.Schema({
  transactionid: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  fees: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: Number,
  },
});
var coursedetails = new mongoose.Schema({
  coursename: {
    required: true,
    type: String,
  },
  coursetitle: {
    required: true,
    type: String,
  },
  coursecatagory: {
    required: true,
    type: String,
  },
  courseid: {
    required: true,
    type: String,
  },
  coursedescription: {
    required: true,
    type: String,
  },
  coursefees: {
    required: true,
    type: Number,
  },
});
var admissiondetails = new mongoose.Schema({
  coursename: {
    required: true,
    type: String,
  },
  courseid: {
    required: true,
    type: String,
  },
  coursecatagory: {
    required: true,
    type: String,
  },
  
  coursefees: {
    required: true,
    type: Number,
  },
  studentname: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  

});
var feedbackdetails = new mongoose.Schema({

  name: {
    required: true,
    type: String,
  }, qid: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  

});
var admindetails = new mongoose.Schema({
  admin: {
    required: false,
    type: String,
  },adminid: {
    required: false,
    type: String,
  },institute: {
    required: false,
    type: String,
  },password: {
    required: false,
    type: String,
  },phn1: {
    required: false,
    type: String,
  },phn2: {
    required: false,
    type: String,
  },phn3: {
    required: false,
    type: String,
  },email: {
    required: false,
    type: String,
  },address: {
    required: false,
    type: String,
  },timing: {
    required: false,
    type: String,
  },footer: {
    required: false,
    type: String,
  },tagline: {
    required: false,
    type: String,
  },newadmission: {
    required: false,
    type: String,
  },newenquiry: {
    required: false,
    type: String,
  },
 
});


var userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    cpcid: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },

    email: {
      required: true,
      type: String,
    },
    month: {
      required: true,
      type: Number,
    },
    course: {
      required: true,
      type: String,
    },
    coursecatagory: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    amount: {
      required: true,
      type: Number,
    },

    registered: {
      required: true,
      type: Number,
    },
    batch: {
      required: true,
      type: Array,
    },
    // timstamps:true,
    feedetails: {
      required: true,
      type: [fdetails],
    },
  },

  { timestamps: true }
);

var Model = mongoose.model("student", userSchema);
var CourseModel = mongoose.model("courses", coursedetails);
var AdmissionModel = mongoose.model("admission", admissiondetails);
var FeedbackModel = mongoose.model("feedback", feedbackdetails);
var AdminModel = mongoose.model("admins", admindetails);


app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    console.log(req.body.cpcid);
    var data = await Model.find({ cpcid: req.body.cpcid });
    // console.log(req.body.username)
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/loginuserpage', async (req, res) => {
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

app.post("/lastcpcid", async (req, res) => {
  var cpciddata =  await Model.find().sort( {_id: -1}).limit(1);
  var courseiddata =  await CourseModel.find().sort( {_id: -1}).limit(1);
  var qiddata =  await FeedbackModel.find().sort( {_id: -1}).limit(1);
  var admiddata =  await AdmissionModel.find().sort( {_id: -1}).limit(1);
  // var data="studentcpc".students.find({}, { array: { $slice: -1 } });
// //  (data);
  // var obj={"cpcid":,"courseid":,"qid"}
  var cpcidnew="",courseidnew="",questionidnew="";
  console.log(cpciddata);
  if(cpciddata.length == 0  ){
     cpcidnew="cpcid0";
  }
  else{
cpcidnew=cpciddata[0].cpcid;
  }

 if(courseiddata.length== 0){
     courseidnew="#cid0";
  }
  else{
    courseidnew=courseiddata[0].courseid;
  }
  if(qiddata.length== 0){
    questionidnew="#q0";
 }
 else{
   questionidnew=qiddata[0].qid;
 }
 

  var obj={"cpcid":cpcidnew,"courseid":courseidnew,"qid":questionidnew,"aid":admiddata.length};
 

  res.send(obj);
// res.json(data);
// hello();
  // res. JSON.stringify(data);
  // res.status(500).json({ data });

}
);
app.post("/updatepend", async (req, res) => {
  try {
    console.log(req.body.cpcid);
    var student = await Model.findOne({ cpcid: req.body.cpcid }, {});
    // console.log(req.body.username)
    console.log(student);
    if (student == null) {
      res.json(0);
    } else {
      transactionid = req.body.tid;
      
      feeslist = student.feedetails;
      var monthofees = "";
      for (var i = 0; i < feeslist.length; i++) {
        if (feeslist[i].transactionid == transactionid) {
          feeslist[i].status = 1;
          feeslist[i].date =new Date().toISOString().slice(0, 10);
          break;
        }
      }

      await Model.findByIdAndUpdate(student._id, {
        feedetails: feeslist,
        // registered:1;
      });

      const fs = require("fs");
      const puppeteer = require("puppeteer");

      (async () => {
        // launch a new chrome instance
        const browser = await puppeteer.launch({
          headless: true,
        });

        // create a new page
        const page = await browser.newPage();

        // set your html as the pages content
        // const html = fs.readFileSync(`./template.html`, 'utf8')
        const html = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">    
                <title>Document</title>
            </head>
            <body>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td width="49%"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;">Payment Receipt</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Transaction ID: ${req.body.tid}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;">Course Description </td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">CPCID:  ${req.body.cpcid}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Course Name: ${student.course}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Course Fees(Current): ${student.amount}</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Biller Name:Anup Kumar Paswan</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Biller Contact Number:8981887239</td>
                      </tr>
                      <tr>
                        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Biller Address: Belgharia,Jatidndas-Nagar </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                      </table></td>
                  </tr>
                </table></td>
                <td width="51%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="right"><img src="logo.png" alt="" width="150"  /></td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right"></td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;"  align="right">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;"  align="right">Receipt Date :${new Date().toISOString().slice(0, 10)} </td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;" align="right">Payer</td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">${student.name}</td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">${student.phone}</td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" align="right">${student.email}</td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" width="34%" height="32" align="center">Transcation Id</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="26%" align="center">Month</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="25%" align="center">Fees</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" width="15%" align="center">Date Of payment</td>
                  </tr>
                  <tr>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" height="32" align="center">${req.body.tid}</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${montharr[parseInt(curmonth-1)]}</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${student.amount}</td>
                    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" align="center">${new Date().toISOString().slice(0, 10)}</td>
                  </tr>
                </table></td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">Please Note:</td>
              </tr>
              <tr>
                <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Dear Student, the bill payment has been done for Month-${montharr[parseInt(curmonth-1)]}.</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">DECLARATION:</td>
              </tr>
              <tr>
                <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">This is an invoice of the receipt of the amount paid against for the Course done under CPC education as described above.  Subject to terms and conditions mentioned at the link.com</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2" align="center">(This is computer generated receipt and does not require physical signature.)  <br />CPC Education Belgharia-56<br />  For Online payment <br />  Paytm Number: <br /> Phone Pay number<br />Google Pay number<br /></td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
              <tr>
                <td colspan="2">&nbsp;</td>
              </tr>
            </table>
            </body>
            </html>
            `;
        await page.setContent(html, {
          waitUntil: "domcontentloaded",
        });

        // create a pdf buffer
        const pdfBuffer = await page.pdf({
          format: "A4",
        });

        // or a .pdf file
        await page.pdf({
          format: "A4",
          path: `src/pdf/invoice.pdf`,
        });

        // close the browser
        await browser.close();
      })();

      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.mail,
          pass: process.env.mailpassword,
        },
      });
      var mailOptions = {
        from: process.env.mail,
        to: req.body.email,
        subject: "Subject",

        html:
          `<div>
              <h1>Dear ` +
          student.name +
          `,</h1>
              <p>Your Fees Payment Receipt.</p>`,
        attachments: [
          {
            filename: "invoice.pdf",
            path: "src/pdf/invoice.pdf",
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          //   break;
          // do something useful
        }
      });

      res.json({ name: student.name, month: new Date().toISOString().slice(0, 10) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/deletestudent", async (req, res) => {
  console.log("deleted");
  try {
    var result = await Model.deleteOne({ cpcid: req.body.cpcid });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.mail,
          pass: process.env.mailpassword,
        },
      });
      var mailOptions = {
        from: process.env.mail,
        to: req.body.email,
        subject: "Subject",

        html:
          `<div>
        <h1>Dear ` +
          req.body.name +
          `,</h1>
        <p>Your course is completed.Now you are deactivated,thank you.If this is not expected kindly contact to the centre.</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          //   break;
          // do something useful
        }
      });
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/deletecourse", async (req, res) => {
  console.log("deleted");
  try {
    var result = await CourseModel.deleteOne({ courseid: req.body.courseid });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/rejectadmission", async (req, res) => {
  console.log("deleted");
  try {
    var result = await AdmissionModel.deleteOne({ email: req.body.email });
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.mail,
          pass: process.env.mailpassword,
        },
      });
      var mailOptions = {
        from: process.env.mail,
        to: req.body.email,
        subject: "Subject",

        html:
          `<div>
        <h1>Dear ` +
          req.body.name +
          `,</h1>
        <p>Your Application to the CPC education is Rejected By the Administration.Though you can kindly contact to the centre .</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          //   break;
          // do something useful
        }
      });
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/makepdf", (req, res) => {
  // res.send('Welcome in Express Server....!!!')
  // const fs = require('fs')
  // const fs = require('fs');
  // const axios = require('axios');
  // const FormData = require('form-data');
  // // Prepare the PDF Generation schema.
  // const generation = {
  // 	html: 'template.html',
  // };
  // // Read the HTML template from disk.
  // const template = fs.readFileSync('./template.html', { encoding: 'utf8' });
  // // Pack the data in a multipart request.
  // const body = new FormData();
  // body.append('template.html', template, { filename: 'template.html' });
  // body.append('generation', JSON.stringify(generation));
  // (async () => {
  // 	// Send the request to Processor.
  // 	const response = await axios.post('http://localhost:3000/process', body, {
  // 		headers: body.getHeaders(),
  // 		responseType: 'stream',
  // 	});
  // 	// Save the result to a file on disk.
  // 	await response.data.pipe(fs.createWriteStream('invoice.pdf'));
  // })();
});
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

app.get("/", (req, res) => {
  res.send("Welcome in Express Server....!!!");
  
  // try {
  //   // res.json(data);
  // } catch (error) {
  //   // res.status(500).json({ message: error.message });
  // }
});
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

app.get("/showstudentfees", async (req, res) => {
  try {
    var data = await Model.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/showcourses", async (req, res) => {
  try {
    var data = await CourseModel.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/showadmission", async (req, res) => {
  try {
    var data = await AdmissionModel.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/showfeedback", async (req, res) => {
  try {
    var data = await FeedbackModel.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/getbatch", async (req, res) => {
  try {
    var data = await Model.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/loginid", async (req, res) => {
  try {
    console.log("hit");
    var data = await Model.findOne({ cpcid: req.body.cpcid });
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/showtopic", async (req, res) => {
  try {
    // console.log("hit");
    var data = await CourseModel.find({ coursecatagory: req.body.name });
    res.json(data);
    console.log(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
var d = new Date();

var curmonth = d.getMonth()+1;

app.post("/showcourses", async (req, res) => {
  try {
      if(req.body.catagory=="all"){
          var data = await CourseModel.find();

      }
      else{
          
          var data = await CourseModel.find({coursecatagory: req.body.catagory},{})
      }

  //   var data = await CourseModel.find();
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/aboutcourse", async (req, res) => {
  try {
    var data = await CourseModel.findOne({ courseid: req.body.courseid });
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/Addstudent", async (req, res) => {
  
  console.log("here" + req.body.username);
  var d = new Date();
  var curmonth = d.getMonth()+1;
  var userfees = {
    transactionid: req.body.cpcid +"m"+montharr[parseInt(curmonth-1)],
    fees: req.body.amount,
    date:"Not Paid",
    status: 0,
  };

  try {
    var result= await AdmissionModel.deleteOne({ email: req.body.email });
    // console.log(result);
  

    var checkmail = await Model.findOne({ email: req.body.email });
    if (checkmail == null){
      // console.log(checkmail);
      var data = new Model({
        name: req.body.username,
        cpcid: req.body.cpcid,
        amount: req.body.amount,
        password: "hj",
        email: req.body.email,
        month: req.body.month + 1,
        course: req.body.course,
        coursecatagory: req.body.coursecatagory,
        registered: "0",
        address: "XXXXXXXXXXXX",
        phone: 9898989898,
        batch: req.body.batch,
        feedetails: [userfees],

        // balance:0
      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);




      // res.json(1);
    } else {
      res.json(0);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/Addcourse", async (req, res) => {
  console.log("here" + req.body.coursename);
    

{
  try {

    var checkcid = await CourseModel.findOne({ courseid: req.body.courseid });
    if (checkcid == null) {
      // console.log(checkmail);
      var data = new CourseModel({
        coursename: req.body.coursename,
        coursetitle: req.body.coursetitle,
        coursefees: req.body.coursefees,
        coursedescription: req.body.coursedesc,
        courseid: req.body.courseid,
        coursecatagory: req.body.coursecatagory,

        
      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json(1);
    } else {
      res.json(0);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
});
app.post("/Addfeedback", async (req, res) => {
    

{
  try {

    // var checkcid = await CourseModel.findOne({ courseid: req.body.courseid });
    // if (checkcid == null) {
      // console.log(checkmail);
      var data = new FeedbackModel({
        qid:req.body.qid,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
       
        
      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json(1);
    // } else {
    //   res.json(0);
    // }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
});

app.post("/Addadmission", async (req, res) => {
  // console.log("here" + req.body.coursename);
    

{
  try {

    var checkcid = await AdmissionModel.findOne({ email: req.body.email });
    // console.log(checkid);
    // if (checkcid == null) {
      // console.log(checkmail);


     
      var data = new AdmissionModel({
        coursename: req.body.coursename,
        coursefees: req.body.coursefees,
        studentname: req.body.studentname,
        phone: req.body.phone,
        email: req.body.email,
        courseid: req.body.courseid,
        coursecatagory: req.body.coursecatagory,  
      });

      var dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json(1);
    // } else {
    //   res.json(0);
    // }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
});
app.post("/registerstudent", async (req, res) => {
  try {
    console.log(req.body.cpcid);
    var student = await Model.findOne(
      { cpcid: req.body.cpcid, registered: "0" },
      {}
    );
    // console.log(req.body.username)
    console.log(student);
    if (student == null) {
      res.json(0);
    } else {
      transactionid = "cpcid3#first";
      feeslist = student.feedetails;

      for (var i = 0; i < feeslist.length; i++) {
        if (feeslist[i].transactionid == transactionid) {
          feeslist[i].status = 1;
        }
      }

      await Model.findByIdAndUpdate(student._id, {
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        feedetails: feeslist,
        // registered:1;
      });
      res.json(student);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/registerstudentuserpage', async (req, res) => {
  try{
      console.log(req.body.cpcid);
      var student = await Model.findOne({cpcid: req.body.cpcid,registered:"0"},{})
      // console.log(req.body.username)
      console.log(student);
      if(student==null){
          res.json(0);
      }
      else{
      transactionid = 'cpcid3#first'
      feeslist = student.feedetails

      for(var i=0; i<feeslist.length; i++)
      {
          if(feeslist[i].transactionid == transactionid)
          {
              feeslist[i].status = 1
          }
      }
      
      await Model.findByIdAndUpdate(student._id, {
          password: req.body.password,
          address:  req.body.address,
          phone:  req.body.phone,
          feedetails: feeslist,
          registered:1
          
        });
      res.json(student)

      }
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

app.post("/updatestudent", async (req, res) => {
  try {
    console.log(req.body.cpcid);
    var student = await Model.findOne({ cpcid: req.body.oldcpcid }, {});
    // console.log(req.body.username)
    // console.log(student);
    if (student == null) {
      res.json(0);
    } else {
      console.log(req.body);
      var values = Object.keys(req.body);
      var values1 = Object.values(req.body);

      // if(Object.values(req.body)!=""){
      // console.log(values);
      // }

      var mydata = {};
      for (var i = 0; i < values1.length - 1; i++) {
        if (values1[i] != "") {
          // console.log(values[i]+" "+values1[i]);
          mydata[values[i]] = values1[i];
        }
      }

      console.log(mydata);
      // console.log(values.batch);

      await Model.findByIdAndUpdate(student._id, mydata);
      res.json(student);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/updatestudentuserpage', async (req, res) => {
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

app.post("/updatecourse", async (req, res) => {
  try {
    // console.log(req.body.cpcid);
    var course = await CourseModel.findOne({ courseid: req.body.oldcourseid }, {});
    // console.log(req.body.username)
    // console.log(student);
    if (course == null) {
      res.json(0);
    } else {
      console.log(req.body);
      var values = Object.keys(req.body);
      var values1 = Object.values(req.body);

      // if(Object.values(req.body)!=""){
      // console.log(values);
      // }

      var mydata = {};
      for (var i = 0; i < values1.length ; i++) {
        if (values1[i] != "") {
          // console.log(values[i]+" "+values1[i]);
          mydata[values[i]] = values1[i];
        }
      }

      console.log(mydata);
      // console.log(values.batch);

      await CourseModel.findByIdAndUpdate(course._id, mydata);
      res.json(course);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/updatefees", async (req, res) => {
  try {
    // console.log(req.body.cpcid);
    var course = await Model.findOne({ cpcid: req.body.cpcid }, {});
    // console.log(req.body.username)
    // console.log(student);
    if (course == null) {
      res.json(0);
    } else {
      console.log(req.body);
      var values = Object.keys(req.body);
      var values1 = Object.values(req.body);

      // if(Object.values(req.body)!=""){
      // console.log(values);
      // }

      var mydata = {};
      for (var i = 0; i < values1.length; i++) {
        if (values1[i] != "") {
          // console.log(values[i]+" "+values1[i]);
          mydata[values[i]] = values1[i];
        }
      }

      console.log(mydata);
      // console.log(values.batch);

      await Model.findByIdAndUpdate(course._id, mydata);
      res.json(course);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/sendreply", async (req, res) => {
  console.log("Successfully sent reply.");
      var nodemailer = require("nodemailer");
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.mail,
          pass: process.env.mailpassword,
        },
      });
      var mailOptions = {
        from: process.env.mail,
        to: req.body.email,
        subject: "Subject",

        html:
          `<div>
        <h1>Dear ` +
          req.body.name +
          `,</h1>
        <p>This Is the Reply from CPC Education of your Enquiry/Feedback.</p>
        <hr/>
        <p>`+req.body.message+`</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          //   break;
          // do something useful
        }
      });
    
});

app.post("/addfees", async (req, res) => {
  // var student = await studentModel.findById(req.body.sid)
  var student = await Model.findOne({ cpcid: "cpcid2" });

  // var fees= await feeModel.findOne({month: req.body.month,amount:req.body.amount})
  var fees = { fees: "276", status: "0", transactionid: "cpcid2#third" };
  // console.log("student: " + student + " fees: " + fees)

  try {
    await Model.findByIdAndUpdate(student._id, {
      $push: { feedetails: fees },
    });
    res.json("done");
  } catch (err) {
    console.log("====================================");
    console.log("error" + err);
    console.log("====================================");
  }
});



app.post("/addfeeseverymonth", async (req, res) => {
  var d = new Date();
    var curmonth = d.getMonth()+1;
    // console.log(curmonth+1);
  //  var curmonth=4;
    // var curyear = d.getyear()+1;

  var data = await Model.find();
for(var i=0;i<data.length;i++){

  var stumonth=data[i].month;
  var correctvalue=curmonth-stumonth;
    if(curmonth-stumonth<0){
       correctvalue=correctvalue+12;
    }

  for(var j=1;j<=correctvalue;j++){

  

  // var student = await studentModel.findById(req.body.sid)
  var student = await Model.findOne({ cpcid: data[i].cpcid });

  // var fees= await feeModel.findOne({month: req.body.month,amount:req.body.amount})
  var fees = { fees: data[i].amount,date:"Not Paid", status: "0", transactionid:data[i].cpcid+"m"+montharr[parseInt(stumonth+j-1)%12] };
  // console.log("student: " + student + " fees: " + fees)

  try {
    await Model.findByIdAndUpdate(student._id, {
      month:curmonth,
      $push: { feedetails: fees },
    });
    res.json("done");
  } catch (err) {
    console.log("====================================");
    console.log("error" + err);
    console.log("====================================");
  }
}
}



});

app.post("/sendmailreg", (req, res) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.mail ,
      pass: process.env.mailpassword,
    },
  });
  var showbatch = "Date And Time<hr/>";
  var times = [
    "7:00-9:00AM",
    "9:00-12:00PM",
    "12:00-2:00PM",
    "2:00-4:00PM",
    "4:00-6:00PM",
    "6:00-8:00PM",
    "8:00-10:00PM",
  ];
  var days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  var keys = ["a", "b", "c", "d", "e", "f", "g"];
  for (var i = 0; i < req.body.batch.length; i++) {
    var s1 = req.body.batch[i][0];
    var s2 = req.body.batch[i][1];
    var s3 = keys.indexOf(s2);
    console.log(s2 + " " + s3);
    showbatch = showbatch + days[s1 - 1] + " : " + times[s3] + "<hr/>";
  }
  // document.getElementById("show").innerHTML=showbatch;

  var mailOptions = {
    from: process.env.mail,
    to: req.body.email,
    subject: "Subject",

    html:
      `<div>
        <h1>Dear ` +
      req.body.username +
      `,</h1>
        <p>Welcome to CPC Education.you have enrolled through this email id.</p>
        <article>Kindly register through your CPCid and Email to the below given link.</article>
        <div>
            <p><strong>CPCid</strong>:` +
      req.body.cpcid +
      `</p>
            <p><strong>Email</strong>:` +
      req.body.email +
      `</p>
        </div>
        <strong>Your enrolled course is:javascript</strong>

        <strong>Your monthly fees is:` +
      req.body.amount +
      `</strong>
        <br />
        Your Enrolled batch:
        <table>
            <thead style="border:1px solid black">
               
            </thead>
            <br/>
            <hr/>
            <tbody id="show">
            ${showbatch}
                
               
            </tbody>
        </table>
        
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      //   break;
      // do something useful
    }
  });
});




app.post("/showadmin", async (req, res) => {
  try {
    var data = await AdminModel.find();
    // console.log(data);
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




app.post('/updateadmin', async (req, res) => {
  try{
      var student = await AdminModel.findOne({adminid: req.body.adminid},{})
      // console.log(req.body.username)
      // console.log(student);
      if(student==null){
          res.json(0);
      }
      else{

      
    const updateadmin = await AdminModel.findOneAndUpdate(
      { adminid: req.body.adminid }, {
      $set: { "address":  req.body.address ,"tagline":req.body.tagline,"phn1":req.body.phn1,"phn2":req.body.phn2,"phn3":req.body.phn3,"email":req.body.email,"footer":req.body.footer,"timing":req.body.timing},

        // res.json("1");
        
    });
    res.json(updateadmin);

          
          

      }
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})



app.listen(port, () => {
  console.log(`Server Started at ${3000}`);
});
