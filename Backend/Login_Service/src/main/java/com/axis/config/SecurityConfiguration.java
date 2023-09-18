package com.axis.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import com.axis.filter.JwtFilter;
import com.axis.service.UserDetailsServiceImpl;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtFilter jwtFilter;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(userDetailsServiceImpl);
	}
	
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception{
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		http.cors().and()
			.csrf()
			.disable()
			.authorizeRequests()
			.antMatchers("/login/customer/register","/login/customer/authenticate","/login/employee/authenticate","/login/admin/authenticate","/login/vendor/authenticate","/login/teamleader/authenticate","/login/customer/send-otp","/login/customer/reset-password","/login/customer/contact-us")
			.permitAll()
			.antMatchers("/login/employee/home","/login/employee/profile","/login/employee/pending-accounts","/login/employee/active-accounts","/login/employee/activate-account","/login/employee/all-customers","/login/employee/all-accounts","/login/employee/delete-customer","/login/employee/change-password")
			.hasRole("EMPLOYEE")
			.antMatchers("/login/customer/home","/login/customer/profile","/login/customer/account-details","/login/customer/change-password")
			.hasRole("CUSTOMER")
			.antMatchers("/login/admin/home","/login/admin/register-employee","/login/admin/edit-user","/login/admin/profile","/login/admin/all-employees","/login/admin/all-vendors","/login/admin/all-teamleaders","/login/admin/delete-employee","/login/admin/register-vendor","/login/admin/register-teamleader","/login/admin/delete-vendor","/login/admin/delete-teamleader","/login/admin/change-password")
			.hasRole("ADMIN")
			.antMatchers("/login/vendor/home","/login/vendor/profile","/login/vendor/change-password")
			.hasRole("VENDOR")
			.antMatchers("/login/teamleader/home","/login/teamleader/profile","/login/teamleader/change-password")
			.hasRole("TEAMLEADER")
			.anyRequest()
			.authenticated()
			.and()
			.exceptionHandling()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

}
