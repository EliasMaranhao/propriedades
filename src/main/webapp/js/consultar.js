/**
 * 
 */
window.onload = function(){
	try{
		var url_string = window.location;
		var url = new URL( url_string);
		
		var aplicacao = url.searchParams.get('aplicacao');

		var divMensagem = document.getElementById('divMensagem');
		
		var divCabecalho = document.getElementById('divCabecalho');
		divCabecalho.innerHTML = '<h3>Aplicação ' +aplicacao+ '</h3>';
		
		var txtNome = document.getElementById('txtNome');
		var btnFiltro = document.getElementById('btnFiltro');
	
		var btnInicio = document.getElementById('btnInicio');
		btnInicio.onclick = function(){
			window.location = 'index.html';
		}
	
		btnFiltro.onclick = function(){
			var totalPaginas;
			var itensPorPagina = 5;
			var paginaAtual = 0

			if(txtNome.value === ''){
				divMensagem.className = 'alert alert-info alert-dismissible fade show';
				divMensagem.innerHTML = '<strong>Favor informar o nome da propriedade</strong>';
				return;
			}

			var json = getPropriedades(aplicacao, txtNome.value.toLowerCase());

			if(json.length > 0){
				totalPaginas = json.length / itensPorPagina;
				var navegador = document.getElementById('navegacao');
				
				/*verificando se ul ja existe*/
				var ul = document.getElementById('paginador');

				/*Toda vez que clicar no botao filtrar página é necessario apagar e criar novamenteo ul existente, se não dá ruim*/
				if(ul !== undefined && ul !== null){
					ul.parentNode.removeChild(ul);
				}
				ul = document.createElement('ul');
				ul.id = 'paginador';
				ul.className = 'pagination justify-content-center';
				navegador.appendChild(ul);

				/*Criando os botoes de páginação*/
				for(var i=0; i < totalPaginas; i++){
					var li = document.createElement('li');
					li.className = 'page-item';

					var a = document.createElement('a');
					a.className = 'page-link';
					a.id = i;
					a.textContent = i;

					li.appendChild(a);
					ul.appendChild(li);
				}

				/*Configurando as ações para os botoes de paginação*/
				var botoesPaginacao = document.getElementsByTagName('a');
				if(botoesPaginacao.length > 0){

					/*logo de cara o botão da primeira página ja vem maecado*/
					botoesPaginacao[0].parentNode.className = 'page-item active';

					for(var i=0; i < botoesPaginacao.length; i++){
						botoesPaginacao[i].onclick = function(event){
							var pagina = event.target;

							/*desmarcar qualquer botao ativo*/
							for(var i=0; i < botoesPaginacao.length; i++){
								botoesPaginacao[i].parentNode.className = 'page-item';
							}

							pagina.parentNode.className = 'page-item active';
							paginaAtual = pagina.id;
							createTableFromJSON(criarPaginacao(paginaAtual, itensPorPagina, json));
						}
					}
				}
			}
			createTableFromJSON(criarPaginacao(paginaAtual, itensPorPagina, json));
		}
	}catch(e){
		divMensagem.className = 'alert alert-danger alert-dismissible fade show';
		divMensagem.innerHTML = '<strong>Ocorreu um erro: ' + e + '</strong>';
	}

}

function criarPaginacao(paginaAtual, itensPorPagina, listaPropriedades){

	var itensDaPagina = new Array();

	if(itensPorPagina > listaPropriedades.length){
		itensPorPagina = listaPropriedades.length;
	}

	var primeiroItemDaPagina = paginaAtual * itensPorPagina;
	var ultimoItemDaPagina = itensPorPagina + primeiroItemDaPagina;

	for(var i = primeiroItemDaPagina; i < ultimoItemDaPagina; i++){

		/*Melhor checar se a posição do array tem alguma coisa, né*/
		if(listaPropriedades[i] !== null && listaPropriedades[i] !== undefined){
			itensDaPagina.push(listaPropriedades[i]);
		}
	}

	return itensDaPagina;
}

function createTableFromJSON(json) {

		//definindo os cabeçalhos
        var colunas = [];
		colunas.push('Nome'); 
		colunas.push('Valor');
		
        // criar tabela dinamica.
        var table = document.createElement('table');
		table.className = 'table table-striped';

        // criar cabeçalho tabela html.
        var tr = table.insertRow(-1);                   //linha da tabela.

        for (var i = 0; i < colunas.length; i++) {
            var th = document.createElement("th");      //cabeçalho da tabela.
            th.innerHTML = colunas[i];
            tr.appendChild(th);
        }

        //adciona dados json as linhas da tabela.
        for (var i = 0; i < json.length; i++) {
            tr = table.insertRow(-1);
			tr.insertCell(-1).innerHTML = '<a href="editar.html?nome=' + json[i].nome + '&aplicacao=' + json[i].aplicacao + '">' + json[i].nome +'</a>';
			tr.insertCell(-1).innerHTML = json[i].valor;
        }

        //inserindo a tabela em um container pré definido.
        var divContainer = document.getElementById('divTabela');
        divContainer.innerHTML = '';
        divContainer.appendChild(table);
    }