class NegociacaoService{
  obterNegociacoesDaSemana(cb){
    let xhr =  new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4){
        if(xhr.status == 200){

          cb(null,JSON.parse(xhr.responseText)
          .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));

        }else{
          cb('Não foi possivel importar as negociações',null);
          console.log(xhr.responseText);
        }
      }
    };
    xhr.send();
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
