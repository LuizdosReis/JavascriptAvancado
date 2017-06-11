class HttpService{

  get(url){
    return new Promise((resolve,reject) => {
      let xhr =  new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.responseText));
          }else{
            reject('Não foi possivel importar as negociações da semana');
          }
        }
      };
      xhr.send();
    });
  }

  put(url,object){
    return new Promise((resolve,reject) =>{
      let xhr =  new XMLHttpRequest();
      xhr.open('POST', url,true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve('Negociação salva com sucesso');
          }else{
            reject('Não foi possivel salvar a negociação');
          }
        }
      };
      xhr.send(JSON.stringify(object));
    });
  }
}
