package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Role;
import java.util.List;

public interface RoleService {

    public List<Role> listAllRoles();

    public Role saveRole(Role role);

    public Role getRoleById(Long id);

    public Role updateRole(Role role);

    public void deleteRole(Long id);
}
