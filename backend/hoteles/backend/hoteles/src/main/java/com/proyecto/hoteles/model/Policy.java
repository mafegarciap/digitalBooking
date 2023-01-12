package com.proyecto.hoteles.model;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_policy")
    private Long idPolicy;

    @Column(name = "policy_title", nullable = false, unique = true)
    private String policyTitle;

    @Column(name = "policy_description", nullable = false, unique = true)
    private String policyDescription;

    public Policy(){

    }

    public Policy(Long idPolicy, String policyTitle, String policyDescription) {
        this.idPolicy = idPolicy;
        this.policyTitle = policyTitle;
        this.policyDescription = policyDescription;
    }

    public Policy(String policyTitle, String policyDescription, Set<ProductPolicy> productPolicies) {
        this.policyTitle = policyTitle;
        this.policyDescription = policyDescription;
    }

    public Long getIdPolicy() {
        return idPolicy;
    }

    public void setIdPolicy(Long idPolicy) {
        this.idPolicy = idPolicy;
    }

    public String getPolicyTitle() {
        return policyTitle;
    }

    public void setPolicyTitle(String policyTitle) {
        this.policyTitle = policyTitle;
    }

    public String getPolicyDescription() {
        return policyDescription;
    }

    public void setPolicyDescription(String policyDescription) {
        this.policyDescription = policyDescription;
    }
}
