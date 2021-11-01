/**
 * 
 */
window.onload = function(){
	
	var url_string = window.location;
	var url = new URL( url_string);
	
	var nome = url.searchParams.get('nome');
	var aplicacao = url.searchParams.get('aplicacao');
	
	var divCabecalho = document.getElementById('divCabecalho');
	divCabecalho.innerHTML = '<h3>Propriedade: ' + nome + '</h3>'
	
	var divMensagem = document.getElementById('divMensagem');

	var valorPropriedade = document.getElementsByName('valorPropriedade');

	var json = getPropriedadePeloNome(nome, aplicacao);
	
	document.getElementById('nome').value = json.nome;
	document.getElementById('valor').value = json.valor;
	
	getOpcoesPropriedade(aplicacao, nome);

	for (var i=0; i < valorPropriedade.length; i++){
        if (valorPropriedade[i].value === json.valor)
            valorPropriedade[i].checked = true;
	}
	
	var btnInicio = document.getElementById('btnInicio');
	btnInicio.onclick = function(){
		window.location = 'index.html';
	}
	
	var btnPesquisar = document.getElementById('btnPesquisar');
	btnPesquisar.onclick = function(){
		window.location = 'consultar.html?aplicacao=' + aplicacao;
	}
	
	var btnEdit = document.getElementById('btnEdit');
	btnEdit.onclick = function(){
		var propriedade = new Propriedade();
		propriedade.nome = nome;
		propriedade.aplicacao = aplicacao;
		
		for (var i=0; i < valorPropriedade.length; i++){
	        if (valorPropriedade[i].checked)
	            propriedade.valor = valorPropriedade[i].value;
		}

		try{
			var retorno = editarPropriedade(propriedade);

			document.getElementById('nome').value = retorno.nome;
			document.getElementById('valor').value = retorno.valor;

			
			divMensagem.className = 'alert alert-success alert-dismissible fade show';
			divMensagem.innerHTML = '<strong>Propriedade alterada com sucesso!</strong>';
		}
		catch(error){
			divMensagem.className = 'alert alert-danger alert-dismissible fade show';
			divMensagem.innerHTML = '<strong>Ocorreu um erro: ' + error + '</strong>';
		}
	}
}

function getRepositorio(aplicacao){
	
	var path;
	var repositorio;
	
	if(aplicacao === 'Empresarial')
		path = 'files/empresarial.json';
		
	else if(aplicacao === 'Oi10331Novo')
		path = 'files/oi10331Novo.json';
		
	else if(aplicacao === 'Oi10331velho')
		path = 'files/oi10331Antigo.json';

	else if(aplicacao === 'PrePagoVelho')
		path = 'files/prePagoRepositorioAntigo.json';
	
	var request = createRequest();
	request.overrideMimeType("application/json");
	request.open('GET', path, false);
	request.onreadystatechange = function(){
		if (request.readyState === 4 && request.status === 200) {
			repositorio = request.responseText;
		}
	};
	request.send(null);
	
	return JSON.parse(repositorio);
}

function getOpcoesPropriedade(aplicacao, nome){
	var repositorio = getRepositorio(aplicacao);
	var propriedade;
	
	for(var i=0; i < repositorio.length; i++){
		if(repositorio[i].propriedade === nome){
			propriedade = repositorio[i];
			break;
		}
	}
	
	var divCabecalho2 = document.getElementById('divCabecalho2');
	var lblProducao = document.getElementById('lblProducao');
	var rdProducao = document.getElementById('rdProducao');
	var lblHomologacao = document.getElementById('lblHomologacao');
	var rdHomologacao = document.getElementById('rdHomologacao');
	var lblEversel = document.getElementById('lblEversel');
	var rdEversel = document.getElementById('rdEversel');
	
	if(propriedade !== undefined){
		divCabecalho2.innerHTML = '<h3> Ambientes: ' + propriedade.alias + '</h3>';
		
		lblProducao.textContent = 'Produção - ' + propriedade.producao;
		if(propriedade.producao === '')
			rdProducao.disabled = true;
			
		rdProducao.value = propriedade.producao;
		
		
		lblHomologacao.textContent = 'Homologação - ' + propriedade.homologacao;
		if(propriedade.homologacao === '')
			rdHomologacao.disabled = true;
			
		rdHomologacao.value = propriedade.homologacao;
		
		
		lblEversel.textContent = 'Eversel - ' + propriedade.eversel;
		if(propriedade.eversel === '')
			rdEversel.disabled = true;
			
		rdEversel.value = propriedade.eversel;
	}else{
		var divMensagem = document.getElementById('divMensagem');
		divMensagem.className = 'alert alert-danger alert-dismissible fade show';
		divMensagem.innerHTML = '<strong>Essa propriedade não foi encontrada no repositório. Informe ao desenvolvedor</strong>';
		
		rdProducao.disabled = true;
		rdHomologacao.disabled = true;
		rdEversel.disabled = true;
	}
	
	

}