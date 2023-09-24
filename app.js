const express=require("express");

const bodyParser=require("body-parser");
//const ejs=require("body-parser");
const app=express();
const mongoose=require("mongoose");
let alert=require("alert");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
mongoose.connect("mongodb+srv://sumit_pate:root@cluster0.8r4ve7j.mongodb.net/MyBlog",{useNewUrlParser:true});
const emailSchema={
  Name:String,
  Email:String,
  Content:String
}
const userSchema={
     userEmail:String
}
const User_email=mongoose.model("user_email",userSchema);
const NewEmail=mongoose.model("NewEmail",emailSchema);

app.post("/contact.html",function(req,res)
{
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.content);
  let newEmail=new NewEmail({
    Name:req.body.name,
    Email:req.body.email,
    Content:req.body.content
  });
  newEmail.save();
  //*************************************************************************************************



res.redirect("/appointment.html");
  //****************************************************************************************************
})

app.get("/appointment.html",function(req,res)
{

  res.sendFile(__dirname+"/appointment.html");
})
let i=1;
app.get("/newsletter.html",function(req,res)
{
  res.sendFile(__dirname+"/newsletter.html");
});







app.post("/index.html",function(req,res)
{
  console.log(req.body.EMAIL);
  let user_email=new User_email({
    userEmail:req.body.EMAIL
  });
  user_email.save();
  res.redirect("/newsletter.html");
})


const search_array=[["Bengaluru","1BK","12,RR Nagar"],
                    ["Bengaluru","1BHK","28,KR Puram"],
                    ["Bengaluru","1BHK","25,Sunkadkatte"],
                    ["Bengaluru","2BHK","85, Banaswadi"],
                    ["Bengaluru","2BHK","92, Tin Factory"],
                    ["Mysuru","1BK","12,Near Mysore Palace"],
                    ["Mysuru","1BHK","21,Near Mysore Zoo"],
                    ["Mysuru","2BHK","85,Kuvempu Nagar"],
                    ["Mysuru","2BHK","92,TK Layout"],
                    ["Mysuru","1BHK","37,GayatriPuram"],
                    ["Belagavi","1BHK","18,Nehru Nagar"],
                    ["Belagavi","2BHK","52, Vadagoan"],
                    ["Belagavi","1BK","07, Tilakwadi"],
                    ["Belagavi","2BHK","1,Machhe"],
                    ["Belagavi","1BK","24,Balgamatti"]
                  ];
app.post("/properties.html",function(req,res)
{

    let result=[];
      const location=req.body.location;
        const bhk=req.body.bhk;
        console.log(location);
        console.log(bhk);
  for(let i=0;i<search_array.length;i++)
  {
    let temp=[];
    if(search_array[i][0]==location && search_array[i][1]==bhk)
    {
      temp.push(search_array[i][0]);
      temp.push(search_array[i][1]);
      temp.push(search_array[i][2])
      console.log(location+" "+bhk);
      result.push(temp);

    }
    else
    {
      console.log("not found");
    }
  }
  console.log(result);
  res.render("result_properties",{result:result});
//  res.render("properties",{result:result});

})





app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res)
{
  res.send("i got the response");
})

app.get("/index.html",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
})
app.get("/properties.html",function(req,res)
{
  res.sendFile(__dirname+"/properties.html");
})

app.get("/agents.html",function(req,res)
{
  res.sendFile(__dirname+"/agents.html")
})


app.get("/contact.html",function(req,res)
{
  res.sendFile(__dirname+"/contact.html");
})



//********************************************************************************

app.get("/data.ejs",function(req,res)
{
  NewEmail.find({})
  .then(function(userData)
{
  res.render("data",{userData:userData});
})
.catch(function(err)
{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("successfully saved");
  }
});
})

//*********************************************************************************************

const port=process.env.PORT||3000;

app.listen(port,function()
{
	console.log("server is running on the port 3000");
});
