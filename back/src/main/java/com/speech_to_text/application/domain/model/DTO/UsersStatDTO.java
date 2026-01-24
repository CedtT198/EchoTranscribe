package com.speech_to_text.application.domain.model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersStatDTO {
    
    @JsonProperty("total_users")
    Integer totalUsers;
    
    @JsonProperty("users")
    List<MonthlyCountDTO> users;
}
