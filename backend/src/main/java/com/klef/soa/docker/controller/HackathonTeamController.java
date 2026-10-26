
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.HackathonTeamRequest;
import com.klef.soa.docker.dto.HackathonTeamResponse;
import com.klef.soa.docker.service.HackathonTeamService;

import jakarta.validation.Valid;

@RestController

public class HackathonTeamController {

    @Autowired
    private HackathonTeamService service;

    @Value("${server.port:8080}")
    private String port;

    @GetMapping("/")
    public String home() {
        return "Hackathon Team Service is running...";
    }

    @GetMapping("/instance")
    public String instance() {
        return "HackathonTeam instance running on port: " + port;
    }

    @PostMapping("/addTeam")
    public HackathonTeamResponse addTeam(
            @Valid @RequestBody HackathonTeamRequest request) {
        return service.addTeam(request);
    }

    @GetMapping("/displayAll")
    public List<HackathonTeamResponse> displayAll() {
        return service.displayAll();
    }

    @GetMapping("/displayById/{id}")
    public HackathonTeamResponse displayById(@PathVariable Long id) {
        return service.displayById(id);
    }

    @PutMapping("/update/{id}")
    public String updateTeam(
            @PathVariable Long id,
            @Valid @RequestBody HackathonTeamRequest request) {
        return service.updateTeam(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTeam(@PathVariable Long id) {
        return service.deleteTeam(id);
    }
}
