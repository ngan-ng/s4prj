package com.aptech.apiv1.model.user;

import com.aptech.apiv1.model.Booking;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Entity
@Data
@Table(name = "Users")
public class User implements Serializable {
    @Id
    @GenericGenerator(
            name = "member-id-number",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "member_sequence"),
                    @Parameter(name = "initial_value", value = "1000"),
                    @Parameter(name = "increment_size", value = "1")
            })
    @GeneratedValue(generator = "member-id-number")
    private long id;
    @Email
    private String email;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
        joinColumns = { @JoinColumn(name = "user_id") },
        inverseJoinColumns = { @JoinColumn(name = "role_id") })
//    @JsonManagedReference
    private List<Role> roles = new ArrayList<>();

    ///////////////////////////////////
    // Member
    private long loyaltyPoints;
    @OneToMany(mappedBy = "member")
    @JsonIgnore
    @JsonManagedReference
    private List<Booking> bookings = new ArrayList<>();
}
