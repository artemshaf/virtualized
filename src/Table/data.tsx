import Randomstring from "randomstring";

const makePerson = () => {
  return {
    name: Randomstring.generate(6),
    surname: Randomstring.generate(4),
    age: Math.floor(10 + Math.random() * 40),
  };
};

export const makeData = (length: number = 2) => {
  const data = [];
  for (let index = 0; index < length; index++) {
    data.push(makePerson());
  }
  return data;
};
