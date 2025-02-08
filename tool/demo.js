var str = "#1 Htmnl,20元# #2 Cs,300元# #3 Node # Node #4 Js,400元#";
var reg = /#(\d+)\s*([^\s,]*),?(\d*)元#/g;
var result = [];
var temp;
while ((temp = reg.exec(str)) !== null) {
    result.push({
        id: temp[1],
        name: temp[2],
        price: temp[3] || "免费",
    });
}
console.log(result);
