package br.com.everis.propriedades.resources;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.everis.propriedades.modelo.Propriedade;
import br.com.everis.propriedades.service.PropriedadesService;

@RestController
public class PropriedadesResource {
	
	@Autowired
	private PropriedadesService propriedadesService;
	
	@GetMapping("/listar") @CrossOrigin(origins = "*")
	public ResponseEntity<List<Propriedade>> buscarTodasAsPropriedades(@RequestParam String aplicacao, @RequestParam String filtro) {
		
		List<Propriedade> propriedades = null;
		
		try {
			propriedades = propriedadesService.getTodasAsPropriedades(aplicacao, filtro);
			
		}catch (IOException e) {
			e.printStackTrace();
			
		}catch (Exception e) {
			e.printStackTrace();
			
		}

		return ResponseEntity.ok(propriedades);
	}
	
	@GetMapping("/buscar") @CrossOrigin(origins = "*")
	public ResponseEntity<Propriedade> buscarPropriedade(@RequestParam String nome, @RequestParam String aplicacao) {
		
		Propriedade propriedade = null;
		
		try {
			propriedade = propriedadesService.buscarPropriedade(nome, aplicacao);
			
		}catch (IOException e) {
			e.printStackTrace();
			
		} 
		catch (Exception e) {
			e.printStackTrace();
			
		}

		return ResponseEntity.ok(propriedade);
	}
	
	@PostMapping("/editar") @CrossOrigin(origins = "*")
	public ResponseEntity<Propriedade> editar(@RequestBody Propriedade propriedade) {
		
		try {
			propriedadesService.atualizarPropriedade(propriedade);

		}catch (IOException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	    return ResponseEntity.ok(propriedade);
	}
}
