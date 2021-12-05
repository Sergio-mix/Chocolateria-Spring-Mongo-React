package co.edu.usa.CRUD.SPRING.MONGO.service;

import co.edu.usa.CRUD.SPRING.MONGO.exception.ResourceNotFoundException;
import co.edu.usa.CRUD.SPRING.MONGO.model.User;
import co.edu.usa.CRUD.SPRING.MONGO.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Boolean existsEmail(String email) {
        return userRepository.existsEmail(email) != null;
    }

    public User authenticate(String email, String password) {
        return userRepository.authenticate(email, password);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        Optional<User> userM = userRepository.findById(user.getId());
        if (userM.isPresent()) {
            User userUpdate = userM.get();
            userUpdate.setId(user.getId());
            userUpdate.setName(user.getName());
            userUpdate.setIdentification(user.getIdentification());
            userUpdate.setAddress(user.getAddress());
            userUpdate.setCellPhone(user.getCellPhone());
            userUpdate.setEmail(user.getEmail());
            userUpdate.setPassword(user.getPassword());
            userUpdate.setZone(user.getZone());
            userUpdate.setType(user.getType());
            return userRepository.save(userUpdate);
        } else {
            throw new ResourceNotFoundException("User with id: " + user.getId() + " NotFound");
        }
    }

    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new ResourceNotFoundException("User with id: " + id + " NotFound");
        }
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ResourceNotFoundException("User with id: " + id + " NotFound");
        }
    }
}

