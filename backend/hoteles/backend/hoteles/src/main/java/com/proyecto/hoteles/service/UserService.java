package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.User;
import java.util.List;

public interface UserService {

    public List<User> listAllUsers();

    public User saveUser(User user);

    public User getUserById(Long id);

    public User updateUser(User user);

    public void deleteUser(Long id);

    public  User getRole(Long id);
}
