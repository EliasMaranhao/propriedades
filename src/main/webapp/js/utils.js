/**
 * 
 */

 function getUrlAplicacao(){
	 return window.location.origin + '/' + window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
 }
 
function createRequest(){
	var request;

	try{
		request = new XMLHttpRequest();
	}catch(tryMS){
		try{
			request = new ActiveXObject('Msxml2.XMLHTTP');
		}catch(otherMS){
			try{
				request = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(failed){
				request = null;
			}
		}
	}

	return request;
}

function getPropriedades(aplicacao, filtro){
	var request = createRequest();
	
	if(request === null){
		alert('Não é possível disparar a solicitação');
		return;
	}
	
	var url = getUrlAplicacao() + '/listar?aplicacao=' + aplicacao + '&filtro=' + filtro;
	var retorno;
	try{
		request.open('GET', url, false);
		request.setRequestHeader('Accept', 'application/JSON');
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				if(request.status = 200){
					retorno = JSON.parse(request.responseText);
				}
			}
		}
		request.send(null);
	}catch(e){
		throw e;
	}

	return retorno;
}

function getPropriedadePeloNome(nome, aplicacao){
	var request = createRequest();
	
	if(request === null){
		alert('Não é possível disparar a solicitação');
		return;
	}
	
	var url = getUrlAplicacao() + '/buscar?nome=' + nome + '&aplicacao=' + aplicacao;
	var retorno;
	try{
		request.open('GET', url, false);
		request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status = 200){
				retorno = JSON.parse(request.responseText);
			}
		}
	}
	request.send(null);
	}catch(e){
		throw e;
	}

	
	return retorno;
}

function editarPropriedade(propriedade){
	
	var request = createRequest();
	
	if(request === null){
		alert('Não é possível disparar a solicitação');
		return;
	}
	
	var url = getUrlAplicacao() + '/editar';
	var retorno;
	
	try{
		request.open('POST', url, false);
		request.setRequestHeader('Content-Type', 'application/json');
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				if(request.status = 200){
					retorno = JSON.parse(request.responseText);
				}
			}
		}
		request.send(JSON.stringify(propriedade));
	}catch(e){
		throw e;
	}

	return retorno;
}