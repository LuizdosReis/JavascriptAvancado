class NegociacaoController{

  constructor(){

    let $ = document.querySelector.bind(document);
    this._inputQuantidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
    this._listaNegociacoes =  new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'apaga');

      this._mensagem = new Bind(
        new Mensagem(),
        new MensagemView($('#mensagemView')),
        'texto');
      }

      adiciona(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = 'Negociação adicionada com sucesso';

      }

      importarNegociacoes(){

        let service = new NegociacaoService();

        Promise.all([
          service.obterNegociacoesDaSemana(),
          service.obterNegociacoesDaSemanaAnterior(),
          service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
          negociacoes.reduce((arrayAchatado,array) => arrayAchatado.concat(array),[])
                     .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

          this._mensagem.texto = "Negociações adicionadas com sucesso";
        }).catch(erro => this._mensagem.texto = erro);
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
