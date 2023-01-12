package com.proyecto.hoteles.service.impl;
import com.proyecto.hoteles.model.Policy;
import com.proyecto.hoteles.repository.PolicyRepository;
import com.proyecto.hoteles.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyServiceImpl implements PolicyService {

    @Autowired
    public PolicyRepository policyRepository;

    @Override
    public List<Policy> listAllPolicies() {
        return policyRepository.findAll();
    }

    @Override
    public Policy savePolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    @Override
    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id).get();
    }

    @Override
    public Policy updatePolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    @Override
    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
