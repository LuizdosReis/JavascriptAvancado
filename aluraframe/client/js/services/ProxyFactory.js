class ProxyFactory{

  static create (object,props,action){
    return new Proxy(object,{
      get (target,prop,receiver) {
        if(props.includes(prop) && ProxyFactory._EhFuncao(target[prop])){

          return function(){
            let returns = Reflect.apply(target[prop],target,arguments);
            action(target);
            return returns;
          }

        }
        return Reflect.get(target,prop,receiver);
      },
      set(target,prop,value,receiver){
        let returns = Reflect.set(target,prop,value,receiver);
        if(props.includes(prop)) action(target);
        return returns;
      }
    });
  }

  static _EhFuncao(func){
    return typeof(func) == typeof(Function);
  }

}
