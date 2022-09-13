const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const port = 3000;


app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname +"/urlap.html"))
})


app.get('/adatok', (req,res)=>{
    fs.readFile('adatok.txt', (err,data)=>{
        if(err){
            res.status(500).send('Hiba a fájl megnyitásakor!!')
        }else{
            var content = data.toString().trim();
            var records = content.split('\n');


            var str = '<table border="1"><thead><tr><td>Sorsz</td><td>Becenév</td><td>Kor</td><td>Fajtája</td><td>Leírás</td></tr></thead>'
            var i = 0;
            records.forEach(record =>{
                i++;
                str += '<tr><td>'+ i +'</td>';
                var datas = record.split('|');

                datas.forEach(data =>{
                    str += '<td>' + data + '</td>';
                })
                str += '</tr>';
            })
        }
    })
})

app.post('/senddata', (req,res)=>{
    var becenev = req.body.becenev;
    var kor = req.body.kor;
    var fajta = req.body.fajta;
    var leiras = req.body.leiras;

    fs.appendFile('adatok.txt', `${becenev}|${kor}|${fajta}|${leiras}\n`, (err)=>{
        if(err){
            res.status(500).send('Hiba a fájl mentése közben!!')
        }else{
            res.status(200).send('Adatok elmentve!!')
        }
    })
})


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}.....`);
})