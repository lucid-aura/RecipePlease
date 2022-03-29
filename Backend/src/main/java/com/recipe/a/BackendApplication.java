package com.recipe.a;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {
	
	
	
	public static void main(String[] args) {
		
		String version = org.springframework.core.SpringVersion.getVersion();
		System.out.println(version);
		SpringApplication.run(BackendApplication.class, args);
		
	}

}
