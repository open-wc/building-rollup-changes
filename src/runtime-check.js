/**
 * asd
 */
class A {
  someMethod() {
    return true;
  }
}

const a = new A();
console.log(a.someMethod());

// can test runtime-helpers with nullish coalescing, optional chaining, etc

function* generator(i) {
  yield i;
  yield i + 10;
}
const gen = generator(10);
console.log(gen.next().value);
