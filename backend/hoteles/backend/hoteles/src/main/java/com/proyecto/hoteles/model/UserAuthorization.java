package com.proyecto.hoteles.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserAuthorization implements UserDetails {
    private String firstName;
    private String userName;
    private String lastName;

    private String email;

    private String password;

    private Long idUser;

    private Collection<? extends GrantedAuthority> authorities;

    public UserAuthorization(String userName, String userPassword, String userEmail, Long idUser, String firstName, String lastName,  List<GrantedAuthority> authorities) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = userEmail;
        this.authorities = authorities;
        this.password = userPassword;
        this.idUser = idUser;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static UserAuthorization build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getRoleName());
        authorities.add(authority);
        return new UserAuthorization(user.getUserName(), user.getUserPassword()
                , user.getUserEmail(), user.getIdUser(), user.getUserName(), user.getUserLastName(),  authorities);
    }
}
