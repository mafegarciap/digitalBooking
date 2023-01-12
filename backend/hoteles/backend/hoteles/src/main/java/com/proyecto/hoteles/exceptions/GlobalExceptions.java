package com.proyecto.hoteles.exceptions;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
@ControllerAdvice
public class GlobalExceptions {
    //private static final Logger logger = LoggerFactory.getLogger(BadRequestException.class);
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> tratamientoErrorResorceNotFound(ResourceNotFoundException rnfe){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ATENCION: ERROR"+ rnfe.getMessage()+"\n"+
                rnfe.getStackTrace());
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> tratamientoErrorBadRequest(BadRequestException bre){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ATENCION: ERROR"+ bre.getMessage()+"\n"+
                bre.getStackTrace());
    }
}