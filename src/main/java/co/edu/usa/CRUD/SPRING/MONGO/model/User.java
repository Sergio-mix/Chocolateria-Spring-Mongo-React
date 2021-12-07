package co.edu.usa.CRUD.SPRING.MONGO.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "user")
public class User {
    @Id
    private Long id;

    @Indexed(unique = true)
    private String identification;

    private String name;

    private String address;

    @Indexed(unique = true)
    private String cellPhone;

    @Email
    @Indexed(unique = true)
    private String email;

    private String password;

    private String zone;

    private String type;
}
