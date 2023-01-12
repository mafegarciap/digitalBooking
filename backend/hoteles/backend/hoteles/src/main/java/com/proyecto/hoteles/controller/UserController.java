package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.User;
import com.proyecto.hoteles.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        String passWEncrypt= passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(passWEncrypt);
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/list")
    @RolesAllowed("ADMIN")
    public ResponseEntity<List<User>> listAllUsers(){
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id){
        ResponseEntity<User> response;

        if (userService.getUserById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(userService.getUserById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }


}
