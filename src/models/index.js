const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const Sequelize = require('sequelize')
const importSync = require('import-sync')
const maxConnections = parseInt(process.env.DB_MAX_CONNECTIONS) || 5

const models = {}

let sequelize

const database = {
  database: 'horario_db_new',
  username: 'postgres',
  password: '1234',
  dialect: 'postgres'

}
sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    logging: true,
    pool: {
      max: maxConnections
    },
    dialect: database.dialect,

  },
)

sequelize.authenticate().then(function (err) {
  if (err) {
    console.log('Sequelize: Unable to connect to the database:', err)
  } else {
    console.log(
      `Se ha podido conectar con la DB: maxConnections=${maxConnections}`
    )
  }
})

/**
 * Declaration of all Models you want to work it.
 */
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = importSync(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // const modelName = model.name;
    let modelName = file.slice(0, -3)
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1) // Capitalize
    models[modelName] = model
  })

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
