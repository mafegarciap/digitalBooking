package com.proyecto.hoteles.service.impl;

import com.proyecto.hoteles.model.UserAuthorization;
import com.proyecto.hoteles.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        com.proyecto.hoteles.model.User user = userRepository.findByUserEmail(userEmail);
        return UserAuthorization.build(user);
    }
}
