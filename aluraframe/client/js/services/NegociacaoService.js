class NegociacaoService{
  obterNegociacoesDaSemana(){
    return new Promise((resolve,reject) => {
      let xhr =  new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/semana');
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){

            resolve(JSON.parse(xhr.responseText)
            .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));

          }else{
            reject('Não foi possivel importar as negociações da semana');
            console.log(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  }

  obterNegociacoesDaSemanaAnterior(){
    return new Promise((resolve,reject) => {
      let xhr =  new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/anterior');
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){

            resolve(JSON.parse(xhr.responseText)
            .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));

          }else{
            reject('Não foi possivel importar as negociações anterior');
            console.log(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  }

  obterNegociacoesDaSemanaRetrasada (){
    return new Promise((resolve,request) => {
      let xhr =  new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/retrasada');
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){

            resolve(JSON.parse(xhr.responseText)
            .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));

          }else{
            reject('Não foi possivel importar as negociações retrasada');
            console.log(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  }

  salvaNegociacao(negociacao){
    let xhr =  new XMLHttpRequest();
    xhr.open('POST', '/negociacoes',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          alert('Negociação salva com sucesso');
        }else{
          alert('Não foi possivel salvar a negociação');
        }
      }
    };

    xhr.send(JSON.stringify(negociacao));
  }
}
