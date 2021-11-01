/**
 * 
 */
window.onload = function(){
	var btnClicado = document.getElementsByTagName('a');
	
	for(var i=0; i < btnClicado.length; i++){
		btnClicado[i].onclick = function(event){
			var botao = event.target;
			
			switch(botao.id){
				case 'btnEmpresarial':
					window.location = 'consultar.html?aplicacao=Empresarial';
					break;
				
				case 'btn10331Novo':
					window.location = 'consultar.html?aplicacao=Oi10331Novo';
					break;
					
				case 'btn10331Velho':
					window.location = 'consultar.html?aplicacao=Oi10331velho';
					break;
					
				case 'btnPrePago':
					window.location = 'consultar.html?aplicacao=PrePagoVelho';
					break;
				default:
			}
			
		}
	}
}