package br.com.everis.propriedades.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.springframework.stereotype.Service;

import br.com.everis.propriedades.modelo.Propriedade;

@Service
public class PropriedadesService {
	
	private String getPropertiesFilePath(String aplicacao) {
		String propertiesFilePath = "";
		
		if("Empresarial".equals(aplicacao))
			propertiesFilePath = "/D:/var/URAEmpresarial/config/URAEmpresarial.properties";
		
		else if("Oi10331Novo".equals(aplicacao))
			propertiesFilePath = "/D:/var/Oi10331Unificada/config/Oi10331Unificada.properties";
		
		else if("Oi10331velho".equals(aplicacao))
			propertiesFilePath = "/D:/Intervoice/Tomcat/lib/Oi10331Unificada.properties";

		else if("PrePagoVelho".equals(aplicacao))
			propertiesFilePath = "/D:/Intervoice/Tomcat/lib/OiAtende.properties";
		
		System.out.println("Caminho para o arquivo: " + propertiesFilePath);
		
		return propertiesFilePath;
	}
	
//	public List<Propriedade> getTodasAsPropriedades(String aplicacao) throws IOException, Exception{
//		
//		System.out.println("Chamou o metodo para consultar a aplicação: " + aplicacao);
//		
//		List<Propriedade> propriedades = new ArrayList<>();
//		Properties properties = new Properties();
//		
//		InputStream inputStream = new FileInputStream(getPropertiesFilePath(aplicacao));
//			
//		properties.load(inputStream);
//		
//		properties.forEach((k, v) -> {
//			Propriedade propriedade = new Propriedade();
//			propriedade.setNome(k.toString());
//			propriedade.setValor(v.toString());
//			propriedade.setAplicacao(aplicacao);
//			propriedades.add(propriedade);
//		});
//		
//		return propriedades;
//	}
	
	public List<Propriedade> getTodasAsPropriedades(String aplicacao, String filtro) throws IOException, Exception{
		List<Propriedade> propriedades = new ArrayList<>();
		
		Configuration config = new PropertiesConfiguration(getPropertiesFilePath(aplicacao));
		
		if(config != null) {
			config.getKeys().forEachRemaining(key -> {
				if(key.toLowerCase().contains(filtro)){
					Propriedade propriedade = new Propriedade();
					propriedade.setNome(key);
					propriedade.setValor(config.getString(key));
					propriedade.setAplicacao(aplicacao);
					propriedades.add(propriedade);
				}
			});
		}
		
		return propriedades;
	}
	
//	private List<Propriedade> adicionarRestricoesDePaginacao(List<Propriedade> propriedades, Pageable pageable) {
//		int paginaAtual = pageable.getPageNumber();
//		int totalRegistroPorPagina = pageable.getPageSize();
//		
//		if(totalRegistroPorPagina > (propriedades.size()))
//			totalRegistroPorPagina = propriedades.size();
//		
//		int primeiroRegistroPagina = paginaAtual * totalRegistroPorPagina; //para saber qual o primeiro registro da página
//		
//		int ultimoRegistroPagina = totalRegistroPorPagina + primeiroRegistroPagina; // para saber qual o ultimo registro da página
//		
//		List<Propriedade> listaParcial = new ArrayList<>();
//		
//		for(int i = primeiroRegistroPagina; i < ultimoRegistroPagina; i++) {
//			listaParcial.add(propriedades.get(i));
//		}
//		
//		System.out.println("Tamanho total do arquivo: " + propriedades.size());
//		System.out.println("Pagina atual: " + paginaAtual);
//		System.out.println("Registros por página: " + totalRegistroPorPagina);
//		System.out.println("Primeiro registro da pagina: " + primeiroRegistroPagina);
//		System.out.println("Ultimo registro da pagina: " + (ultimoRegistroPagina - 1));
//		
//		System.out.println("Tamanho da lista parcial: " + listaParcial.size());
//		return listaParcial;
//	}
	
	public void atualizarPropriedade(Propriedade propriedade) throws IOException, Exception{
		
		PropertiesConfiguration conf;
		
		conf = new PropertiesConfiguration(getPropertiesFilePath(propriedade.getAplicacao()));
		conf.setProperty(propriedade.getNome(), propriedade.getValor());
		conf.save();
	}
	
	public Propriedade buscarPropriedade(String nome,  String aplicacao) throws IOException, Exception {
		Propriedade propriedade = null;
		
		Configuration config = new PropertiesConfiguration(getPropertiesFilePath(aplicacao));
		
		if(config != null) {
			propriedade = new Propriedade();
			propriedade.setNome(nome);
			propriedade.setValor(config.getString(nome));
			propriedade.setAplicacao(aplicacao);
		}
			
		return propriedade;
	}
	
}
