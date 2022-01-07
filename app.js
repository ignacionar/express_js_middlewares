import express from "express";

const app = express();

// BODY INTERPRETATION
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// MIDDLEWARE
const fn = (req, res, next) => {
  console.log('Run middleware')
  next();
}

const onlyAbout = (req, res, next) => {
  console.log('Run middleware About');
  next();
}

// 4 All
app.use(fn);

// Only one          MW         
// app.use('/about', onlyAbout) - Plural Method 

app.get('/', (req, res) => {
  res.json('Home');
});

// ID PARAMS RAMAS Y DATOS NO SENSIBLES / DINÁMICOS

app.get('/user/:id', onlyAbout, (req, res) => { 
  res.json({message: `User id: ${req.params.id}`})
//                              REQ PARAMS :TAG
// 1
});

// FILTROS Y DATOS SENSIBLES / ESTÁTICOS

//      PATH  |  QUERY STRING
//              Pasar name cuando sea igual a X y edad cuando sea Y
app.get('/user?name=nacho&edad=17', onlyAbout, (req, res) => { 
  res.json(req.query.name)
//                              REQ PARAMS :TAG
// name
});

//        Path       MW           FB
app.get('/about', onlyAbout, (req, res) => { // - Singular Method 
  res.json({message: `Este es el mensaje`});
});


app.post('/about', (req, res) => { // - Singular Method 
  console.log(req.body);
  res.json({message: `Este es el body: ${req.body.name}`});
});

app.listen(5000, () => {
  console.log('Server is running in port 5000');
})