class NegociacaoService{

  constructor(){
    this._http = new HttpService();
  }

  obterNegociacoes(){
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ]).then(periodos => {
      let negociacoes = periodos
                .reduce((dados,periodo) => dados.concat(periodo),[]);
      return negociacoes;
    }).catch(erro => {throw new Error(erro)});
  }

  ordena(coluna){

  }

  obterNegociacoesDaSemana(){
      return this._http
      .get('negociacoes/semana')
      .then(negociacoes => {
        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor));
      }).catch(erro => {
        console.log(erro);
        throw new Error('Não foi possivel obter as negociações da semana passada');
      });
  }

  obterNegociacoesDaSemanaAnterior(){
      return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => {
        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor));
      }).catch(erro => {
        console.log(erro);
        throw new Error('Não foi possivel obter as negociações da semana anterior');
      });
  }

  obterNegociacoesDaSemanaRetrasada (){
      return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => {
        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor));
      }).catch(erro => {
        console.log(erro);
        throw new Error('Não foi possivel obter as negociações da semana retrasada');
      });
  }

  salvaNegociacao(negociacao){
    this._http.put('negociacoes',negociacao)
      .then(mensagem => alert(mensagem))
      .catch(erro => alert(erro));
  }

}
