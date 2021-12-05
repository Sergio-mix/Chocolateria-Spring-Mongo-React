package co.edu.usa.CRUD.SPRING.MONGO.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private Long id;

    private String identification;

    private String name;

    private String address;

    private String cellPhone;

    private String email;

    private String password;

    private String zone;

    private String type;
}
