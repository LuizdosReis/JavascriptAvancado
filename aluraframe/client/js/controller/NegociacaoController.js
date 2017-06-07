class NegociacaoController{

  constructor(){

    let $ = document.querySelector.bind(document);
    this._inputQuantidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
    self = this;
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{
      get (target,prop,receiver) {
        if(['adiciona','apaga'].includes(prop) && typeof(target[prop]) == typeof(Function)){
          return function(){
            Reflect.apply(target[prop],target,arguments);
            self._negociacoesView.update(target);
          }
        }
        return Reflect.get(target,prop,receiver);
      }
    });

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));

  }

  adiciona(event){
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._limpaFormulario();

    this._mensagem.texto = 'Negociação adicionada com sucesso';

    this._mensagemView.update(this._mensagem);

  }

  _criaNegociacao(){
    return  new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario(){
    this._inputQuantidade.value =  1;
    this._inputValor.value =  0.0;
    this._inputData.value = '';

    this._inputData.focus();

  }

  limpaMensagem(){
    this._mensagem.texto = '';
    this._mensagemView.update(this._mensagem);
  }

  apaga(){
    this._listaNegociacoes.apaga();

    this._mensagem.texto = 'Negociações apagadas com sucesso';

    this._mensagemView.update(this._mensagem);

  }
}
