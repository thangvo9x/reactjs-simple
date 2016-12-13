var express = require("express");
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended : false});
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
app.listen(3000);


var mang = ["Wake Up","Exercise", "Talking to My Friends", "Call To My Home"];
app.get("/",function(req,res){
  res.render("trangchu");
})


app.post("/getNotes",function(req,res){
  res.send(mang);
});

app.post("/add", parser , function(req,res){
  var newNode = req.body.note;
  mang.push(newNode);
  res.send(mang);
});

app.post("/delete",parser, function(req,res){
  var id = req.body.idXoa;
  mang.splice(id,1);
  res.send(mang);
});

app.post("/update",parser, function(req,res){
  var id = req.body.idSua;
  mang[id] = req.body.noidung;
  res.send(mang);
});
