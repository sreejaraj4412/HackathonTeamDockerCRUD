package com.klef.soa.docker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HackathonTeamResponse {

    private Long id;
    private String teamName;
    private String projectTitle;
    private Integer memberCount;
    private Boolean qualified;
}
