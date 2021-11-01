/**
 * 
 */
class Propriedade{
	constructor(nome, valor, aplicacao){
		this.nome = nome;
		this.valor = valor;
		this.aplicacao = aplicacao;
	}
}

class Ambiente{
	constructor(propriedade, eversel, producao, homologacao, alias, vpn){
		this.propriedade = propriedade;
		this.eversel = eversel;
		this.producao = producao;
		this.homologacao = homologacao;
		this.alias = alias;
		this.vpn = vpn;
	}
}