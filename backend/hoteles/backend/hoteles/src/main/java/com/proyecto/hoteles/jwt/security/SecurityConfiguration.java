package com.proyecto.hoteles.jwt.security;

import com.proyecto.hoteles.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        prePostEnabled=false,
        securedEnabled = false,
        jsr250Enabled = true
)

public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl myUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService).passwordEncoder(passwordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/auth/**").permitAll()
                .and().authorizeRequests().antMatchers("/products").permitAll()
                .and().authorizeRequests().antMatchers( "/products/**").permitAll()
                .and().authorizeRequests().antMatchers("/locations").permitAll()
                .and().authorizeRequests().antMatchers( "/locations/").permitAll()
                .and().authorizeRequests().antMatchers("/categories").permitAll()
                .and().authorizeRequests().antMatchers( "/categories/").permitAll()
                .and().authorizeRequests().antMatchers("/swagger-ui.html/**").permitAll()
                .and().authorizeRequests().antMatchers("/swagger-ui/**").permitAll()
                .and().authorizeRequests().antMatchers("/v3/api-docs/**").permitAll()
                .and().authorizeRequests().antMatchers("/mailing/**").permitAll()
                .anyRequest().authenticated();*/
        http.csrf().disable().authorizeRequests()
                .and().authorizeRequests().antMatchers("/authenticate").permitAll()
                .and().authorizeRequests().antMatchers("/swagger-ui.html/**").permitAll()
                .and().authorizeRequests().antMatchers("/swagger-ui/**").permitAll()
                .and().authorizeRequests().antMatchers("/v3/api-docs/**").permitAll()
                .and().authorizeRequests().antMatchers("/categories/**").permitAll()
                .and().authorizeRequests().antMatchers("/cities/**").permitAll()
                .and().authorizeRequests().antMatchers("/products/**").permitAll()
                //.and().authorizeRequests().antMatchers("/cities/**").hasAuthority((Rol.ROLE_USER.name()))
                //.and().authorizeRequests().antMatchers("/products/**").hasAuthority(Rol.ROLE_ADMIN.name())
                .and().authorizeRequests().antMatchers("/images/**").permitAll()
                .and().authorizeRequests().antMatchers("/policies/**").permitAll()
                .and().authorizeRequests().antMatchers("/countries/**").permitAll()
                .and().authorizeRequests().antMatchers("/characteristics/**").permitAll()
                .and().authorizeRequests().antMatchers("/users/**").permitAll()
                //.and().authorizeRequests().antMatchers("/login/**").hasAuthority
//                .and().authorizeRequests().antMatchers("/bookings/list").permitAll()
//                .and().authorizeRequests().antMatchers("/bookings/product/**").permitAll()
//                .and().authorizeRequests().antMatchers("/bookings/get/**").permitAll()
//                .and().authorizeRequests().antMatchers("/bookings/user/**").permitAll()
                .and().authorizeRequests().antMatchers("/product-characteristics/**").permitAll()
                .and().authorizeRequests().antMatchers("/bookings/**").permitAll()
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        //config.setAllowedOrigins(Arrays.asList("http://localhost:4200", "*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource cors = new UrlBasedCorsConfigurationSource();
        cors.registerCorsConfiguration("/**", config);
        return cors;
    }

    /**
     * Registro los filtros configurados anteriormente para que sea un filter implementado por sprinb
     * de esta manera uso e implemento el registro y apertura de los cors
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
