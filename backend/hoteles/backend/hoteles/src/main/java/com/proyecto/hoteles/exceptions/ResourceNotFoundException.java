package com.proyecto.hoteles.exceptions;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.apache.log4j.Logger;

public class ResourceNotFoundException extends Exception{

    //private static final Logger logger = Logger.getLogger(ResourceNotFoundException.class);
    //private static final org.slf4j.Logger logger = LoggerFactory.getLogger(ResourceNotFoundException.class);
    public ResourceNotFoundException (String mensaje){
        super(mensaje);
        //logger.warn("Resorce Not Found Exception: ");
    }
}
