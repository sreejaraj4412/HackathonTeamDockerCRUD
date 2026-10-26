
package com.klef.soa.docker.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class HackathonTeamRequest {

    @NotBlank(message = "Team name is required")
   
    private String teamName;

    @NotBlank(message = "Project title is required")
   
    private String projectTitle;

    @NotNull(message = "Member count is required")
   
    private Integer memberCount;

    @NotNull(message = "Qualified status is required")
    private Boolean qualified;
}
