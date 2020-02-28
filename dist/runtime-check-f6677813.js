const o=new class{someMethod(){return!0}};console.log(o.someMethod()),(async()=>{await!0,console.log("foo")})();const e=function*(o){yield o,yield o+10}(10);console.log(e.next().value);(async()=>{for await(let o of class{static async*[Symbol.asyncIterator](){await!0,yield"true"}})console.log(o)})();
//# sourceMappingURL=runtime-check-f6677813.js.map
