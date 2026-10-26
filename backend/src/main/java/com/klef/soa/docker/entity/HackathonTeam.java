package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hackathonteam")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HackathonTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teamName;

    private String projectTitle;

    private Integer memberCount;

    private Boolean qualified;
}
