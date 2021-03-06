class NegociacaoController{

  constructor(){

    let $ = document.querySelector.bind(document);
    this._inputQuantidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
    this._listaNegociacoes =  new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'apaga','ordena', 'inverteOrdem');

    this._ordemAtual = '';

      this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($('#mensagemView')),
        'texto');
      }

      adiciona(event){
        event.preventDefault();
        try{
          this._listaNegociacoes.adiciona(this._criaNegociacao());
          this._limpaFormulario();
          this._mensagem.texto = 'Negociação adicionada com sucesso';
        }catch(erro){
          this._mensagem.texto = erro;
        }

      }

      ordena(coluna){
        if(coluna == this._ordemAtual){
          this._listaNegociacoes.inverteOrdem();
        }else{
          this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
      }

      importarNegociacoes(){

        let service = new NegociacaoService();

        service.obterNegociacoes()
        .then(negociacoes => {
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociações adicionadas com sucesso';
        }).catch(error => this.mensagem.texto = error);
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
      }

      apaga(){
        this._listaNegociacoes.apaga();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
      }
    }
