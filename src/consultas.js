
//....Selecciona la marca Kawasaki  y la cantidad 350....//


db.ventas.aggregate(
    [  { $match: { marca: "Kawasaki", cantidad: 350  }  } ],
   
 );

//....Ordena la  cantidad  ascendente y selecciona la marca Ducati y la cantidad menor o igual a 150....//


db.ventas.aggregate([ 
  { $sort: { cantidad: 1 }}, 
  { $match: { marca: "Ducati", cantidad: {$lte: 150}  }  } ],   
   
 );
//....Selecciona calidad mala y agruparlo el id por marca y la suma del precio_ventas y ordena descendente ....//

 db.ventas.aggregate([
    { $match: { calidad: "Mala" } },
    { $group: { _id: "$marca", total: { $sum: "$precio_ventas" } } },
    { $sort: { total: -1 } }
  ]);

//....Selecciona calidad buena y agruparlo el id por marca y la suma de la cantidad y ordena ascendente....//
  db.ventas.aggregate([
    { $match: { calidad: "Buena" } },
    { $group: { _id: "$marca", total: { $sum: "$cantidad" } } },
    { $sort: { total: 1 } }
  ]);

//....Selecciona cantidad mayor o igual a 150 y lo agrupa por  el id por modelo y la suma de la cantidad y ordena descendente ....//
  db.ventas.aggregate([
    { $match: { cantidad: {$gte: 150} } },
    { $group: { _id: "$modelo", total: { $sum: "$cantidad" } } },
    { $sort: { total: -1 } }
  ]);



//....Selecciona el precio_fabrica  mayor a 2000 y lo agrupa por  el id por la marca y  multiplica el precio por la cantidad y la ordena descendente ....//

  db.ventas.aggregate([
    { $match: { precio_fabrica: {$gt: 2000} } },
    { $group: { _id: "$marca", total:  { $sum: { $multiply: [ "$precio_fabrica", "$cantidad" ] } } } },
    { $sort: { total: -1 } }
  ]);

//....Agrupa por  el id por la marca y  coge el máximo del precio_venta de cada marca que se repite y la ordena ascendente....//
  db.ventas.aggregate([
    { $group: { _id: "$marca", maximo_ventas: { $max: "$precio_venta" } } },
    { $sort: { maximo_ventas: 1 } }
  ]);

 //....Agrupa por  el id por la calidad y  coge la media de  precio_venta de cada marca y la ordena descendente ....//
  db.ventas.aggregate([

    {$group: {_id: "$calidad" , Media: {$avg: "$precio_venta"}}},
    {$sort: {Media: -1}}
]);