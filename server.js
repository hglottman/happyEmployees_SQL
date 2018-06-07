var Sequelize = require('sequelize');
var connection = new Sequelize('happyemployees', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

const employee = connection.define('employees', {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    job_id: {
        type: Sequelize.INTEGER,
    },
    department_id: {
        type: Sequelize.INTEGER,
    }
});

// employee.findAll().then(dolphins => {
//   console.log(dolphins)
// }, err => {
//   console.error(err)
// });


const department = connection.define('departments', {
    department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    }
});

const job = connection.define('jobs', {
    job_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.INTEGER,
    }
});


employee.belongsTo(department, { foreignKey: 'department_id' });
employee.belongsTo(job, { foreignKey: 'job_id' });


const salary = connection.define('salaries', {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
    },
    sum: {
        type: Sequelize.INTEGER,
    }
});

salary.hasMany(employee, { foreignKey: 'employee_id' });


// salary.find({
//     where: {}, include: [{
//         model: employee,
//         include: [{
//             model: department
//         }],
//         include: [{
//             model: job,
//             where: {title : 'Sales'}  
//         }]
//     }]  
//     }).then(data => {
//         console.log(JSON.stringify(data))
//     }, err => {
//         console.error(err)
//     });


    salary.findAll({
        where: {}, include: [{
            model: employee,
            required: true,
            include: [{
                model: job,
                where: {title : 'Teacher'}, 
            },{
                model: department,
                where: {name : 'Coding Bootcamp'}   
            }] 
        }]  
        }).then(data => {
            console.log(JSON.stringify(data))
        }, err => {
            console.error(err)
        });



// const dolphin = Dolphin.build({ name: 'hi',color:"red",height:12,birth_date:new Date() });

// dolphin.save().then((data)=>{
//   console.log(data);
// } , (err)=>{
//   console.error(err)
// })

// Dolphin.create({ name: 'Roy', color: "gray", height: 11, birth_date: new Date()}).then((data) => {
//     console.log(data);
//   }, (err) => {
//     console.error(err)
//   })

// Dolphin.update({ name: "Amiti" },
//   {
//     where: {
//       name: "hi"
//     }
//   }).then((data) => {
//     console.log(data); // rows affected
//   }, (err) => {
//     console.error(err)
//   });

// var n =   Math.floor(Math.random() * (100 - 10) + 10);
// console.log(n);


// for(let i=0; i<=n; i++) {

//    Dolphin.create({ name: "Dolphin" + i, color: "gold", height: 12, birth_date: 2015}).then((data) => {
//        console.log(data);
//      }, (err) => {
//        console.error(err)
//      })
// }

// Dolphin.update({ name: "shark" },
//   {
//     where: {
//       name: "Dolphin1"
//     }
//   }).then((data) => {
//     console.log(data); // rows affected
//   }, (err) => {
//     console.error(err)
//   });

// Dolphin.destroy({
//     where: {
//         name:Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + 'olp' + '%')
//     }  
// }).then((data) => {
//     console.log(data)
// })

// Dolphin.findAll().then(dolphins => {
//   console.log(dolphins)
// }, err => {
//   console.error(err)
// });







