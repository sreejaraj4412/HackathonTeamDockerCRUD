package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.HackathonTeamRequest;
import com.klef.soa.docker.dto.HackathonTeamResponse;

public interface HackathonTeamService {

    HackathonTeamResponse addTeam(HackathonTeamRequest request);

    List<HackathonTeamResponse> displayAll();

    HackathonTeamResponse displayById(Long id);

    String updateTeam(Long id, HackathonTeamRequest request);

    String deleteTeam(Long id);
}
