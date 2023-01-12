package com.proyecto.hoteles.exceptions;

//import org.apache.log4j.Logger;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
public class BadRequestException extends Exception{
   // private static final Logger logger = Logger.getLogger(BadRequestException.class);
   //private static final Logger logger = LoggerFactory.getLogger(BadRequestException.class);
    public BadRequestException (String mensaje){
        super(mensaje);
        //logger.warn("Bad Request Exception: ");
    }
}
