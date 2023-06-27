// const express = require("express");
// const bodyParser = require("body-parser");
//
// const app = express();
//
// app.get("/",function(req,res){
//   res.send("Hello");
// });
//
//
// app.listen(3000,function(){
//   console.log("server started on port 3000");
// })
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items=[];
let workItems=[];


app.get("/",function(req,res){
  let today = new Date();
  const currentDay= today.getDay();
  let options ={
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day =today.toLocaleDateString("en-US",options);
  // var date=""
  // if (currentDay===0){
  //   date="Sunday";
  // }
  // else if(currentDay===1){
  //   date="Monday";
  // }
  // else if(currentDay===2){
  //   date="Tuesday";
  // }
  // else if(currentDay===3){
  //   date="Wednesday";
  // }
  // else if(currentDay===4){
  //   date="Thursday";
  // }
  // else if(currentDay===5){
  //   date="Friday";
  // }
  // else{
  //   date="Saturday";
  // }

// ****************html*************
// <% if(kindOfDay==="Saturday"||kindOfDay==="Sunday"){ %>
//   <h1 style="color:blue"><%= kindOfDay %> list</h1>
// <% }else{ %>
//   <h1 style="color:red"><%= kindOfDay %> list</h1>
// <% } %>
// **************htmlend************
  if(items.lenth!==0){
      res.render('list', {listTitle: day, listItem:items});
  }


});

app.post("/",function(req,res){
  let item = req.body.note;

  if(req.body.list==="work"){

    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
  res.render('list', {listTitle: "work list", listItem:workItems});
});
app.post("/work",function(req,res){
  let item=req.body.note;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000,function(){
  console.log("server started on port 3000");
})
