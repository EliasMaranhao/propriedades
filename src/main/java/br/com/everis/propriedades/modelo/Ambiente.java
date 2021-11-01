package br.com.everis.propriedades.modelo;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Ambiente implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String propriedade = "";
	private String eversel = "";
	private String producao = "";
	private String homologacao = "";
	private String alias = "";
	private String vpn = "";

}
