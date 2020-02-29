const o=new class{someMethod(){return!0}};console.log(o.someMethod());const e=function*(o){yield o,yield o+10}(10);console.log(e.next().value);
