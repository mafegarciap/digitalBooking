package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Country;
import com.proyecto.hoteles.model.Policy;
import java.util.List;

public interface PolicyService {

    public List<Policy> listAllPolicies();

    public Policy savePolicy(Policy policy);

    public Policy getPolicyById(Long id);

    public Policy updatePolicy(Policy policy);

    public void deletePolicy(Long id);
}
