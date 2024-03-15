const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

if (process.argv.length < 3) {
  console.log('password missing')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('number missing')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.o4av712.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose.connect(url)

  Person.find({})
    .then((result) => {
      console.log('phonebook:')
      result.forEach(({ name, number }) => console.log(name, number))
    })
    .catch((error) => console.log(error))
    .finally(() => mongoose.connection.close())
}

if (process.argv.length === 5) {
  mongoose.connect(url)

  const [name, number] = process.argv.slice(3, 5)

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then(({ name, number }) =>
      console.log(`added ${name} number ${number} to phonebook`)
    )
    .finally(() => mongoose.connection.close())
}
