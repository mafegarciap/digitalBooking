package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.Role;
import com.proyecto.hoteles.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/save")
    public ResponseEntity<Role> saveRoley(@RequestBody Role role){
        return ResponseEntity.ok(roleService.saveRole(role));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Role>> listAllRoles(){
        return ResponseEntity.ok(roleService.listAllRoles());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Integer id){
        ResponseEntity<Role> response;

        if (roleService.getRoleById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(roleService.getRoleById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
}
