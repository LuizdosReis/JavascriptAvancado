class NegociacaoService{

  constructor(){
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana(){
    return new Promise((resolve,reject) => {
      this._http
      .get('negociacoes/semana')
      .then(negociacoes => {
        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
      }).catch(erro => {
        console.log(erro);
        reject('Não foi possivel obter as negociações da semana passada');
      });
    });
  }

  obterNegociacoesDaSemanaAnterior(){
    return new Promise((resolve,reject) => {
      this._http
      .get('negociacoes/anterior')
      .then(negociacoes => {
        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
      }).catch(erro => {
        console.log(erro);
        reject('Não foi possivel obter as negociações da semana anterior');
      });
    });
  }

  obterNegociacoesDaSemanaRetrasada (){
    return new Promise((resolve,reject) => {
      this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => {
        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
      }).catch(erro => {
        console.log(erro);
        reject('Não foi possivel obter as negociações da semana retrasada');
      });
    });
  }

  salvaNegociacao(negociacao){
    this._http.put('negociacoes',negociacao)
      .then(mensagem => alert(mensagem))
      .catch(erro => alert(erro));
  }

}
