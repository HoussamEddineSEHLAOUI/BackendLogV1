const express =  require('express');
const  BodyParser = require('body-parser');
// body parsser hellp you to acces to req.body

const cors =require('cors');
const Upload = require('express-fileupload');



const app = express();

app.use(BodyParser.json());
app.use(cors());
app.use(Upload());

const database={
    users:[
        {
            id:'1234',
            name : "sehlaoui" ,
            prenom : "houssam eddine" ,
            matricle : "123456" ,
            email : "houssam@gmail.com" ,
            numero : "000000000" ,
            Promo : " 2 eme annee" ,
            filier : "g info " ,
            gender : "M" ,
            password : "hi" ,
            departement : "D" ,
            Etage : "2" ,
            chambre : "342",
            type :'admin',
            choix  :{}

        },
        {
            id:'12345',
            name : "kabbaj" ,
            prenom : "samiha" ,
            matricle : "123456" ,
            email : "his@gmail.com" ,
            numero : "6574934875" ,
            Promo : " 2 eme annee" ,
            filier : "g info " ,
            gender : "M" ,
            password : "hi" ,
            departement : "D" ,
            Etage : "2" ,
            chambre : "342",
            choix  :{},
            type :'admin'
        },
        {   
            id:'123456',
            name : "Toudrti" ,
            prenom : "Hiba" ,
            matricle : "123456" ,
            email : "hi@gmail.com" ,
            numero : "6574934875" ,
            Promo : " 2 eme annee" ,
            filier : "g info " ,
            gender : "M" ,
            password : "hi" ,
            departement : "D" ,
            Etage : "2" ,
            chambre : "342",
            choix  :{},
            type :'admin'
        }
    ]

}



//app.use(express.static(__dirname+'/public'))
app.get('/',(req ,res)=>{
    res.send(database.users)

});


app.put('/updateProfile',(req ,res)=>{
    const {id ,email , numero} =req.body;
    let found =false ;
    database.users.forEach(user =>{
        if(user.id===id ){
            found=true ;
            if(email !==''){
                user.email=email;
            }
            if(numero !==''){
                user.numero=numero;
            }
            
            return res.json(user);
        }
    })
    if (!found){
        res.status(400).json('error not found');
    }
})
  


app.post('/Choix', (req,res)=>{
    const {id , choix} =req.body;
    let found =false ;
    database.users.forEach(user =>{
        if(user.id===id){
            found=true ;
            user.choix=choix;
            return res.json("succés");
        }
    })
    if (!found){
        res.status(400).json('error not found');
    }

})




app.get('/download', function(req, res){
    const file = `${__dirname}/upload-folder/Note_pour_Inscriptions.docx`;
    res.download(file); 
  });




app.post('/signin' ,(req,res)=>{
    const {email , password} =req.body;
    let found =false ;
    database.users.forEach(user =>{
        if(user.email===email && user.password=== password){
            found=true ;
            return res.json(user);
        }
    })
    if (!found){
        res.status(400).json('error loggin in');
    }

})


app.post('/recus', (req,res)=>{
    if(req.files){
        console.log(req.files);
        var file = req.files.myFile ;
        var fileName =file.name;
        console.log(fileName);
        file.mv('./uploads/'+fileName ,(err)=>{
            if(err){
                res.json(err)
            }else{
                res.json("File Uploaded")
            }
           
        })

    }
})






































app.listen(3030);


// /*
// /---->res =this is working
// /signin  --> POST =success / fail
// /register -->POST=user
// /profile/:userId -->get=user
// /image-->PUT--->user










































