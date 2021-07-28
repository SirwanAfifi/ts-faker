import faker from "faker";

export const GeneratorLib = {
  string: faker.datatype.string,
  text: faker.lorem.text,
  number: faker.datatype.number,
  boolean: faker.datatype.boolean,
  datetime: faker.datatype.datetime,
  userName: faker.internet.userName,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  fullName: faker.name.findName,
  price: faker.commerce.price,
  sentence: faker.lorem.sentence,
};
