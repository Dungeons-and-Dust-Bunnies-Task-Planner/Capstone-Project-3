package com.example.capstoneprojectteam3.services;

import com.example.capstoneprojectteam3.models.DustBunniesUserDetails;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DustBunniesUserDetailsService implements UserDetailsService {
    public final UserRepository usersDao;

    public DustBunniesUserDetailsService(UserRepository usersDao) {
        this.usersDao = usersDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User details not found for user: " + username);
        } else {
            return new DustBunniesUserDetails(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
        }
    }
}
