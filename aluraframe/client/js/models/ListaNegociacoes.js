class ListaNegociacoes{

    constructor(updateView){
        this._updateView = updateView;
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        this._updateView(this);
    }

    apaga(){
        this._negociacoes = [];
        this._updateView(this);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }
}