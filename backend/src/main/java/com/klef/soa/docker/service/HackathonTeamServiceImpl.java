
package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.HackathonTeamRequest;
import com.klef.soa.docker.dto.HackathonTeamResponse;
import com.klef.soa.docker.entity.HackathonTeam;
import com.klef.soa.docker.repository.HackathonTeamRepository;
import com.klef.soa.docker.service.HackathonTeamService;

@Service
public class HackathonTeamServiceImpl implements HackathonTeamService {

    @Autowired
    private HackathonTeamRepository repo;

    @Override
    public HackathonTeamResponse addTeam(HackathonTeamRequest request) {

        HackathonTeam team = HackathonTeam.builder()
                .teamName(request.getTeamName())
                .projectTitle(request.getProjectTitle())
                .memberCount(request.getMemberCount())
                .qualified(request.getQualified())
                .build();

        HackathonTeam saved = repo.save(team);
        return mapToResponse(saved);
    }

    @Override
    public List<HackathonTeamResponse> displayAll() {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public HackathonTeamResponse displayById(Long id) {
        HackathonTeam team = repo.findById(id).orElse(null);

        if (team == null)
            return null;

        return mapToResponse(team);
    }

    @Override
    public String updateTeam(Long id, HackathonTeamRequest request) {

        HackathonTeam team = repo.findById(id).orElse(null);

        if (team == null)
            return "Hackathon team not found";

        team.setTeamName(request.getTeamName());
        team.setProjectTitle(request.getProjectTitle());
        team.setMemberCount(request.getMemberCount());
        team.setQualified(request.getQualified());

        repo.save(team);
        return "Hackathon team updated successfully";
    }

    @Override
    public String deleteTeam(Long id) {

        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Hackathon team deleted successfully";
        }

        return "Hackathon team not found";
    }

    private HackathonTeamResponse mapToResponse(HackathonTeam team) {

        return HackathonTeamResponse.builder()
                .id(team.getId())
                .teamName(team.getTeamName())
                .projectTitle(team.getProjectTitle())
                .memberCount(team.getMemberCount())
                .qualified(team.getQualified())
                .build();
    }
}
