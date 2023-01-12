package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.Policy;
import com.proyecto.hoteles.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping("/save")
    public ResponseEntity<Policy> savePolicy(@RequestBody Policy policy){
        return ResponseEntity.ok(policyService.savePolicy(policy));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Policy>> listAllPolicies(){
        return ResponseEntity.ok(policyService.listAllPolicies());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Policy> getPolicyById(@PathVariable Integer id){
        ResponseEntity<Policy> response;

        if (policyService.getPolicyById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(policyService.getPolicyById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
}
