// Using references (Normalization) -> consistency
let author = {
  name: "Mosh",
};

let course = {
  author: "id",
};

//using embbeded docs (Denormalization)  -> performance
let course = {
  author: {
    name: "Mosh",
  },
};

// hybrid
let author = {
  name: "Mosh",
  // other properties
};
let course = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
